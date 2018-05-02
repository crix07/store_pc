import { Component} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ActivatedRoute, Router, Params } from "@angular/router";
import { HttpClient } from '@angular/common/http'
import { Http } from "@angular/http";
import { User } from "../../models/user";
import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
import { AbstractControl } from '@angular/forms';
import * as firebase from 'firebase'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
public title: String;
public forma:FormGroup;
public err:string;
public fb:any;
public status

  constructor(private route:ActivatedRoute, private router:Router, private _userservice:UserService) {
        this.forma = new FormGroup({
          'email': new FormControl('', Validators.required),
          'password1': new FormControl('', Validators.required),
          'displayName': new FormControl('', Validators.required)
        })
        this.title = 'Registro'

  }



registerWithFire(){
  let password = this.forma.value.password1
  let email = this.forma.value.email



if (this.forma.valid) {
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(()=>{
    this.verificar()
    var user = firebase.auth().currentUser;
    let name = this.forma.value.displayName
    user.updateProfile({
      displayName: name,
      photoURL: null
    }).then(()=> {
        this.router.navigate(['/send-email'])
    }).catch((error)=> {
      console.log(error)
    });
      })
  .catch(err=>{
    if (err.code == 'auth/invalid-email') {
      this.err = 'auth/invalid-email'
    }else if(err.code == 'auth/email-already-in-use'){
      this.err = 'auth/email-already-in-use'
    } else if (err.code == 'auth/weak-password') {
      this.err = 'auth/weak-password'
    }
  })
}
}

verificar(){
  let user = firebase.auth().currentUser
  user.sendEmailVerification().then(function(){
  })
  .catch(err => console.log(err))
}

create(){
  this._userservice.register(this.forma.value)
    .subscribe(
      (response:any) => {
      if (response.user._id && response.user) {
          this.status = 'success';

          this.forma = new FormGroup({
            'nombre': new FormControl('',),
            'nickname': new FormControl(''),
            'email': new FormControl(''),
            'password1': new FormControl(''),
            '_id': new FormControl(''),
            'image': new FormControl(''),
            'role': new FormControl('ROLE_USER')
          })
      }
    }, err => {
      this.status = 'err'
      this.err = JSON.parse(<any>err._body);
    })
}



}
