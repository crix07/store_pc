import { Component } from '@angular/core';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser'
import { ActivatedRoute, Router } from "@angular/router";
import { Http } from "@angular/http";
import {AmazonService} from '../../services/amazon.service';
import {UserService} from '../../services/user.service';
import { UploadService } from '../../services/upload.service';
import { User } from '../../models/user';
import { FacebookService, InitParams, UIParams, UIResponse } from 'ngx-facebook';
import { GLOBAL } from '../../services/global';
declare var $;
declare var jQuery;
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

public detailsProduct;
public imgProduct:any[] = []
public similarProductos;
public similarImages
public iframe
public titleProducts
public amazon;
public tag;
public Quantity:number = 1
public status:string;
public identity
loading:boolean = true;
public nameSimilar:any[] = []

  constructor(public fb:FacebookService, public sanitizer:DomSanitizer, public _userService:UserService, public http:Http, public activatedroute:ActivatedRoute, public _amazonService:AmazonService, public route:Router) {
    this.identity = _userService.getIdentity()
    this.ProductDetails();
    this.productS()
    this.amazon = GLOBAL.urlAmazon;
    this.tag = GLOBAL.TagA;
    this.ProductDetails = this.ProductDetails.bind(this)
  }

  menosUnid(){
    if (this.Quantity >= 2) {
        this.Quantity--;
    }
  }


  addUnid(){
    if (this.Quantity >= 1) {
      return this.Quantity++;
    }
  }

  similarTam(asin){
    location.reload()
    this.route.navigate(['/product/',asin])
}

  productS(){
    this.activatedroute.params.subscribe(params => {
      this._amazonService.similaresProduct(params['ident'])
        .subscribe((similar:any) => {
          this.similarProductos = similar
          let nameSimil:any[] = []
          for (let i = 0; i < similar.length; i++) {
              nameSimil.push(similar[i].ItemAttributes.Title.split(' ').slice(0, 4).join(' '))
          }
          this.nameSimilar = nameSimil
          setTimeout(function(){
          $('.similar').flexslider({
            animation: "slide",
            controlNav: false,
            animationLoop: false,
            slideshow: false,
            prevText: '',
            nextText: '',
            itemWidth: 250,
            touch: true,
            itemMargin: 10,
          })
        }, 1)
        })
    })
  }


  shareFacebook(url){
    let params: UIParams = {
      href: 'https://www.youtube.com/watch?v=_5rKeavFfd8',
      method: 'share'
    }

    this.fb.ui(params)
    .then((res: UIResponse) => console.log(res))
    .catch((e: any) => console.error(e));
  }

public imgBig
Elevate(event, position){
    for (let i = 0; i < this.imgProduct.length; i++) {
        this.imgBig = this.imgProduct[position].HiResImage.URL
      }
    let enlaceImage = event.target.src
    let lightBox = '<div class="lightbox">'+
                      '<img src="'+enlaceImage+'" id="zoom_mw" data-zoom-image="'+this.imgBig+'" />'+
                      '<div class="btn-close">X</div>'+
                    '</div>'
    $('body').append(lightBox)
    $('#zoom_mw').elevateZoom({
      cursor: "crosshair",
    })
    $('.lightbox').click(function(){
      $(this).remove()
      $('.zoomContainer').remove()
      $('.zoomLens').remove()
      $('.zoomWindowContainer').remove()
    })
    $('.btn-close').click(function(){
      $('.lightbox').remove()
      $('.zoomContainer').remove()
      $('.zoomLens').remove()
      $('.zoomWindowContainer').remove()
    })
}
  ProductDetails(){
    this.activatedroute.params.subscribe(params => {
      this._amazonService.SearchProduct(params['ident'])
        .subscribe((product:any) => {
          this.detailsProduct = product
          this.imgProduct = product.ImageSets
          this.imgProduct = product.ImageSets.ImageSet.reverse()
          this.iframe = product.CustomerReviews.IFrameURL.toString()
          this.loading = false;
          if (this.detailsProduct) {
            setTimeout(()=>{

              $('#carousel').flexslider({
               animation: "slide",
               controlNav: false,
               animationLoop: false,
               slideshow: false,
               prevText: '',
               nextText: '',
               itemWidth: 150,
               touch: true,
               itemMargin: 10,
               asNavFor: '#slider'
             });

             $('#slider').flexslider({
               animation: "slide",
               controlNav: false,
               directionNav: false,
               animationLoop: false,
               slideshow: false,
               sync: "#carousel"
             });
           },100)
          }
        })
    })
  }

}
