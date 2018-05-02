import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import * as firebase from 'firebase'
@Component({
  selector: 'app-send-register',
  templateUrl: './send-register.component.html'
})
export class SendRegisterComponent  {

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
          localStorage.setItem('identity', JSON.stringify(user))
      }
    })
  }

}
