import { Component, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from "../../services/user.service";
import { AmazonService } from '../../services/amazon.service';
import { HttpClient } from '@angular/common/http'
import  {GLOBAL} from '../../services/global';
import * as firebase from 'firebase'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

public identity;
public uno;
public dos;
public tres;
private amazo:string;
private tag:string;
public loading:boolean = true;

  constructor(public activatedroute:ActivatedRoute, public _userService:UserService, private _amazonService:AmazonService, public route:Router) {

    this.amazo = GLOBAL.urlAmazon;
    this.tag = GLOBAL.TagA;

    this.requestBoards()
    this.requestGraphic()
    this.requestKeyBoards()
    this.identity = _userService.getIdentity()
}

ngDoCheck(){
    this.identity = this._userService.getIdentity()
}

requestKeyBoards(){
  this.activatedroute.params.subscribe(params => {
    this._amazonService.SearchProducts('Keyboards gaming',1)
        .subscribe((response:any) => {
          this.tres = response.result;
          this.loading = false;
        })
  })
}


addCart(position){
  const addProduct = {
    ASIN: this.uno[position].ASIN,
    name: this.uno[position].ItemAttributes.Title,
    price: this.uno[position].ItemAttributes.ListPrice.FormattedPrice,
    image: this.uno[position].MediumImage.URL,
    DetailPageURL: this.uno[position].DetailPageURL,
    user: this.identity._id,
    quantity: 1
  }

  this._userService.agregarProduct(addProduct).subscribe(
    response => {


    }
  )
}


addCartDos(position){
  const addProduct = {
    ASIN: this.dos[position].ASIN,
    name: this.dos[position].ItemAttributes.Title,
    price: this.dos[position].ItemAttributes.ListPrice.FormattedPrice,
    image: this.dos[position].MediumImage.URL,
    DetailPageURL: this.dos[position].DetailPageURL,
    user: this.identity._id,
    quantity: 1
  }

  this._userService.agregarProduct(addProduct).subscribe(
    response => {

    }
  )
}


addCartTres(position){
  const addProduct = {
    ASIN: this.tres[position].ASIN,
    name: this.tres[position].ItemAttributes.Title,
    price: this.tres[position].ItemAttributes.ListPrice.FormattedPrice,
    image: this.tres[position].MediumImage.URL,
    DetailPageURL: this.tres[position].DetailPageURL,
    user: this.identity._id,
    quantity: 1
  }

  this._userService.agregarProduct(addProduct).subscribe(
    response => {


    }
  )
}

requestGraphic(){
  this.activatedroute.params.subscribe(params => {
    this._amazonService.SearchProducts('Graphic Cards',1)
        .subscribe((response:any) => {
          this.dos = response.result;
          this.loading = false;
          console.log(response);

        })
  })
}


requestBoards(){
  this.activatedroute.params.subscribe(params => {
    this._amazonService.SearchProducts('motherboards',1)
        .subscribe((response:any) => {
          this.uno = response.result;
          this.loading = false;
          console.log(response);

        })
  })
}

detailsProd(asin){
  this.route.navigate(['product',asin])
}


returnCategory(termino:string){
  this.route.navigate(['/category/',termino])
}

}
