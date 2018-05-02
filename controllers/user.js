'use strict'


// Modulos
const bcrypt = require('bcrypt-nodejs');
const fs = require('fs');
const path = require('path');

// servicio jwt
const jwt = require('../services/jwt');

// Modelos
const User = require('../models/user');

// Acciones

function destroyAccount(req, res){
  let user = req.params.id;
  User.deleteOne({_id: user}, (err, user)=>{
    if (err) {
      res.json(err)
    } else {
      res.json(user)
    }
  })
}



function getUsers(req, res){
  User.find({}, (err, users)=>{
    if (err) {
      res.json(err)
    } else{
      res.json(users)
    }
  })
}

function saveUser(req, res){
  var user = new User();

  var params = req.body;
  console.log(req.body)
  if ( params.password1 && params.nombre && params.nickname && params.email ) {
    user.nombre = params.nombre;
    user.nickname = params.nickname;
    user.email = params.email;
    user.role = 'ROLE_USER';

    User.findOne({email: user.email.toLowerCase()}, (err, issetUser)=>{
      if (err) {
        res.status(500).send({message: `error al buscar el usuario ${err}`})
      } else {
        if (!issetUser) {
          bcrypt.hash(params.password1, null, null, function(err, hash){
            user.password = hash;

            // guardar usuario en la bd
            user.save((err, userStored)=>{
              if (err) {
                res.status(500).send({message: 'error al guardar el usuario'})
              } else {
                if (!userStored) {
                  res.status(404).send({message: 'no se ha registrado el usuario'})
                } else {
                  res.status(200).send({user: userStored})
                }
              }
            })
          })
        } else {
          res.status(404).send({message: 'el usuario no puede registrarse porque el Email ya existe, Por favor Inicia Sesion como '+issetUser.email})
        }
      }
    })
  } else {
    res.status(500).send({message: 'Por favor Introduce los datos correctamente'})
  }
}


function login(req, res){

  var email = req.body.usuario;

  var password = req.body.password;

  User.findOne({email: email.toLowerCase()}, (err, user)=>{
    if (err) {
      res.status(500).send({message: 'error al comprobar el usuario'})
    } else {
      if (user) {
        bcrypt.compare(password, user.password, (err, check)=>{
          if (check) {

            if (req.body.gettoken) {
              res.status(200).send({
                token: jwt.createToken(user)
              })
            } else {

              res.status(200).send({user})
            }

          } else {
            res.status(404).send({message: 'el usuario no ha podido loguearse correctamente'})
          }
        })

      } else {
        res.status(404).send({message: 'el usuario no pudo loguearse'})
      }
    }
  })
}

function protegida(req, res){
  res.status(200).send({
    message: 'ya puedes entrar a esta ruta :v',
    user: req.user
  });

}

function updateUser(req, res){
  var userId = req.params.id;

  let params = req.body;

  if (userId != req.user.sub) {
    return res.status(500).send({message: 'no tienes permiso para actualizar el usuario'});
  }

  User.findByIdAndUpdate(userId, params, {new:true},(err, userUpdated)=>{
    if (err) {
      res.status(500).send({message: 'error al actualizar usuario'})
    } else {
      if (!userUpdated) {
        res.status(404).send({message: 'no se ha podido actualizar el usuario'});
      } else {
        res.status(200).send({user: userUpdated});
      }
    }
  })
}


function uploadImage(req, res){
    var userId = req.params.id;
    var file_name = 'no subido...';

    if (req.files) {
      var file_path = req.files.image.path;
      var file_split = file_path.split('\\');
      var file_name = file_split[5];


      var ext_split = file_name.split('\.');
      var file_ext = ext_split[1];

      if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif') {
        if (userId != req.user.sub) {
          return res.status(500).send({message: 'no tienes permiso para actualizar el usuario'});
        }

        User.findByIdAndUpdate(userId, {image: file_name}, {new:true},(err, userUpdated)=>{
          if (err) {
            res.status(500).send({message: 'error al actualizar usuario'})
          } else {
            if (!userUpdated) {
              res.status(404).send({message: 'no se ha podido actualizar el usuario'});
            } else {
              res.status(200).send({user: userUpdated, image: file_name });
            }
          }
        })
      } else {
        fs.unlink(file_path, (err)=>{
          if (err) {
            res.status(500).send({message: 'extension no valida y fichero no borrado'})
          } else {
            res.status(500).send({message: 'extension no valida'})
          }
        })
      }

    } else {
      res.status(200).send({
        message: 'no se han subido ficheros'
      })
    }
}


function getImageFile(req, res){

  var imageFile = req.params.imageFile;
  var path_file = './public/src/assets/images/users/' + imageFile;
console.log(path_file)
  fs.exists(path_file, function(exists){
    if (exists) {
      res.sendFile(path.resolve(path_file));
    } else {
      res.status(404).send({message: 'la imagen no existe'})

    }
  })


}


module.exports = {
  getUsers,
  saveUser,
  login,
  protegida,
  updateUser,
  uploadImage,
  getImageFile,
  destroyAccount
}
