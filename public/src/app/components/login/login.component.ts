import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth'
import { HttpClient } from '@angular/common/http'
import * as firebase from 'firebase'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent  {
public title: String;
public identity;
public login:FormGroup;
public status:String;
public token;
public err:string;

  constructor(public _route:ActivatedRoute, public _router:Router, public _userservice:UserService, public afAuth:AngularFireAuth) {
    this.login = new FormGroup({
      'usuario': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });

    this.title = 'Iniciar Sesion'
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
          localStorage.setItem('identity', JSON.stringify(user))
      }
    })
    this.identity = _userservice.getIdentity()

  }


ingresar(proveedor:string) {
  this._userservice.login(proveedor)
}

loginFire(){
    let email = this.login.value.usuario
    let password = this.login.value.password

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(()=>{
        this._router.navigate(['/config'])
    })
    .catch(error => {
      this.err = ''
        if (error.code == 'auth/user-not-found') {
          this.err = 'auth/user-not-found'
        } else if (error.code == 'auth/invalid-email') {
          this.err = 'auth/invalid-email'
        } else if(error.code == 'auth/wrong-password') {
          this.err = 'auth/wrong-password'
        }
    })
}


restablecerPassword(){

  var auth = firebase.auth();
  var emailAddress

  auth.sendPasswordResetEmail(emailAddress).then(function() {
    // Email sen
  }).catch(function(error) {
    console.log(error)
  });
}



}
