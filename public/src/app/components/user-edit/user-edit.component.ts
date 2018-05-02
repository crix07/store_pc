import { Component, DoCheck} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ActivatedRoute, Router, Params } from "@angular/router";
import { Http } from "@angular/http";
import { User } from "../../models/user";
import { GLOBAL } from '../../services/global';
import { HttpClient } from '@angular/common/http'
import { UserService } from '../../services/user.service';
import { UploadService } from '../../services/upload.service';
import * as firebase from 'firebase'
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html'
})
export class UserEditComponent  {
public title:String;
public url:String;
public token;
public status;
public identity
public user
  constructor(public _userservice:UserService, public route:Router, public _uploadservice:UploadService) {
    this.title = 'Configuracion de Cuenta';
    firebase.auth().onAuthStateChanged(user => {
      localStorage.setItem('identity', JSON.stringify(user))
    })
    this.identity = _userservice.getIdentity()
    this.token = _userservice.getToken();
    this.url = GLOBAL.urlApi;
    this.user = new FormGroup({
      'nombre': new FormControl('', Validators.required),
      'image': new FormControl('', Validators.required)
    })
  }

  ngOnInit() {
  }
  ngDoCheck(){
    this.identity = this._userservice.getIdentity()
  }

deleteAccount(){
    let res = confirm(`CUIDADO!! Realmente Quieres eliminar TU Cuenta??!`);
    if (res) {

  let user = firebase.auth().currentUser;

  user.delete().then(() =>{
    localStorage.clear()
    this.identity = null
    this.route.navigate(['/'])
  }).catch(function(error) {

  });
}
}


  destroy(){
    let res = confirm(`CUIDADO!! Realmente Quieres eliminar TU Cuenta??!`);
    if (res) {
    this._userservice.delete(this.identity).subscribe(
      response =>{
        if (!response) {
          this.status = 'err';
        } else {
          localStorage.clear();
          this.identity = null;
          this.route.navigate(['/']);
        }
        }
    )
  }
  }


  updateUser(){
    let image =  document.getElementById('image')
    console.log(this.user)
    console.log(image)
    let user = firebase.auth().currentUser;
    let storage = firebase.storage().ref()


    user.updateProfile({
      displayName: this.user.controls.nombre.value,
      photoURL: null
    }).then(() => {
      firebase.auth().onAuthStateChanged(user => {
        localStorage.setItem('identity', JSON.stringify(user))
      })
      setTimeout(()=>{
        this.identity = this._userservice.getIdentity()
        this.token = this._userservice.getToken();
      }, 1000)
      this.status = 'success'
    }).catch(function(err) {
      console.log(err.code)
      console.log(err.message)
    });
  }


  actualizar(){
      this._userservice.updateUser(this.identity).subscribe(
        (response:any) => {
          if (!response.user) {
              this.status = 'err';
          } else {
            this.status = 'success';
            localStorage.setItem('identity', JSON.stringify(this.identity));
            // Subida de la imagen

            this._uploadservice.makeFileRequest(this.url+'image-user/'+this.identity._id, [], this.filesToUpload, this.token, 'image')
                    .then((result: any) => {
                      this.identity.image = result.image;
                      localStorage.setItem('identity', JSON.stringify(this.identity));
                    });

          }
        },
        error => {
          var errMessage = <any>error;
          if (errMessage != null) {
            this.status = 'err';
          }
        }
      )
  }
public filesToUpload: Array<File>;
  fileChangeEvent(fileInput:any){
    console.log(fileInput.target.files[0])
    // this.filesToUpload = <Array<File>>fileInput.target.files;
  }



}
