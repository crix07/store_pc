import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AmazonService } from '../../services/amazon.service';
import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
declare var $;
declare var jQuery;
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent {
public products;
public url;
public amazo;
public tag;
public identity;
public cantidad:any[] = []
public loading:boolean = true;
public message:string;
  constructor(public _userService:UserService, private activateroute:ActivatedRoute, private router:Router, public amazon:AmazonService) {
    this.searchproduct();
    this.url = GLOBAL.urlAmazon;
    this.amazo = GLOBAL.urlAmazon;
    this.tag = GLOBAL.TagA;
    this.identity = _userService.getIdentity();
  }

  addCart(position){
    const addProduct = {
      ASIN: this.products[position].ASIN,
      name: this.products[position].ItemAttributes.Title,
      price: this.products[position].ItemAttributes.ListPrice.FormattedPrice,
      image: this.products[position].MediumImage.URL,
      DetailPageURL: this.products[position].DetailPageURL,
      user: this.identity._id,
      quantity: 1
    }

    this._userService.agregarProduct(addProduct).subscribe(
      response => {
      }
    )
  }


public termino
public current:number = 1
public numpages:any[] = []


  searchproduct(){
      this.activateroute.params.subscribe(params=>{
        this.amazon.SearchProducts(params['termino'],params['page'])
          .subscribe((products:any)  => {
            this.termino = params['termino']
            this.current = parseInt(params['page'])
            this.products = products.result
            let page = params['page']
            let numPages:any[] = []
            for (let i = 1; i < products.totalPages; i++) {
                numPages.push(i)
            }
            this.numpages = numPages.slice(0,10)

            setTimeout(()=>{
              if (products === undefined) {
                  this.message = `${params['termino']}`
              } else {
                this.message = ''
              }
            })
            this.loading = false;
          })
      })
  }

  next(){
    if (this.current <= 10){
      this.router.navigate(['/products',this.termino, this.current++])
    }
  }

  details(asin){
    this.router.navigate(['/product/',asin])
  }




}
