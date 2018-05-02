import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import * as firebase from 'firebase'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router'
@Component({
  selector: 'app-password',
  templateUrl: './password.component.html'
})
export class PasswordComponent {
public password:FormGroup
public err:string
  constructor(public route:Router) {
    this.password = new FormGroup({
      'email': new FormControl('', Validators.required)
    })
  }

  handlePassword(){
    let auth = firebase.auth()
    let emailAddress = this.password.value.email

    auth.sendPasswordResetEmail(emailAddress).then(()=> {
      this.route.navigate(['/done-pass'])
    }).catch(err => {
      if (err.code == 'auth/invalid-email') {
        this.err = 'auth/invalid-email'
      } else if (err.code == 'auth/user-not-found') {
        this.err = 'auth/user-not-found'
      }
    });
  }

}
