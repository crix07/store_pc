import { Component, Input, Output, EventEmitter, DoCheck, OnChanges} from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http'
import { UserService } from '../../../services/user.service';
import { Router } from "@angular/router";
import { GLOBAL } from "../../../services/global";
import { AngularFireAuth } from 'angularfire2/auth'
import * as firebase from 'firebase'
declare var $;
declare var jQuery;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent   {
public search:string
public identity;
public url:string;
public status:boolean = false;
public productos;
    constructor(public router:Router, public _userService:UserService, public afAuth:AngularFireAuth) {
      this.url = GLOBAL.urlApi;

      if (this.identity) {
        this.cartProduct();
      }
      firebase.auth().onAuthStateChanged(user => {
        localStorage.setItem('identity', JSON.stringify(user))
      })
    }

toggle(){
  // $('.sidebar').toggleClass('active');
  $('.btn-sidebar').toggleClass('toggle');
  this.status = !this.status;
}
  ngDoCheck(){

    this.identity = this._userService.getIdentity()
  }

    ngOnChanges(){
      this.cartProduct()
    }


  detalles(asin){
    this.router.navigate(['/product',asin])
  }

    cartProduct(){
      this._userService.getProducts(this.identity._id)
            .subscribe((productsGuar:any) => {
              this.productos = productsGuar.products;
            })
    }


logout(){
  localStorage.clear();
  this.identity = null;
  this.router.navigate(['/'])
  this._userService.logOut()
}

searchKey(termino:string){
  if (termino.length >= 1) {
    this.router.navigate(['/products',termino,1]);
  } else {
    this.router.navigate(['/'])
  }

}


}
