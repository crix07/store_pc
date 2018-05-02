import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http'
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import { GLOBAL } from "./global";

@Injectable()
export class AmazonService {
  public url:string;


  constructor(private http:HttpClient){
    this.url = GLOBAL.urlApi;
  }

  similaresProduct(item){
    return this.http.get(this.url+'similares/'+item);
  }

  SearchProduct(ident){
    return this.http.get(this.url+'searchone/'+ident);
  }

  SearchProducts(keyword,pages){
    return this.http.get(this.url+'amazon/'+keyword+'/'+pages);
  }

  getProducts(){
    return this.http.get(this.url+'getProduct');
  }

  createProduct(products){
      let params = JSON.stringify(products);
      let headers = new HttpHeaders({'Content-Type':'application/json'});

      return this.http.post(this.url+'saveProduct', params, {headers: headers});
  }

}
