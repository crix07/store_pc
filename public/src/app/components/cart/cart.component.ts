import { Component, DoCheck } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

public user;
public productsStoreds:any[] = [];
public precios = [];
public totalProducts:number[] = [];
public sumaTotal;
public subtotalProducts:any[] = [];
public cantidad;
public quantity:any[] = [];
public quantitySuma;

  constructor(public userservice:UserService) {
    this.user = userservice.getIdentity();

    this.products()

  }





deleteAll(user){
  let res = confirm('Seguro que quieres ELIMINAR todos tus productos?');
  if (res) {
    this.userservice.destroyProducts(user)
    .subscribe(all => {
      this.products();
    })
  }
}


  delete(id){
    this.userservice.destroyProduct(id)
      .subscribe(()=>{
        this.products()
      })
  }

  addUnid(precio, position){
    if (this.productsStoreds[position].Quantity >= 1) {
      this.productsStoreds[position].Quantity++

      this.userservice.updateProducts(this.productsStoreds[position])
      .subscribe(()=>{
        this.products()
      })

    }

    if (this.productsStoreds[position].Quantity === 0) {
        this.productsStoreds[position].Quantity = 1
    }
  }

  menosUnid(precio, position){

    if (this.productsStoreds[position].Quantity >= 2) {
      this.productsStoreds[position].Quantity--;

    this.userservice.updateProducts(this.productsStoreds[position])
      .subscribe(() => {
        this.products()
      })
    }

    if (this.productsStoreds[position].Quantity === 0) {
      this.productsStoreds[position].Quantity = 1
    }
  }

  products(){
    this.productsStoreds = []
    this.quantity = [];
    this.totalProducts = [];
    this.precios = [];
    this.quantitySuma = [];
    this.subtotalProducts = [];

    this.userservice.getProducts(this.user._id)
    .subscribe((products:any) => {
      this.productsStoreds = products.products;

      for(let product of this.productsStoreds){
        this.quantity.push(product.Quantity)
        this.precios.push(parseFloat(product.price.replace('$','')))
        this.subtotalProducts.push(parseFloat(product.price.replace('$','')) * product.Quantity)
      }

      this.quantitySuma = this.quantity.reduce(function(acc, element){
        return acc + element
      })
      this.totalProducts = this.subtotalProducts.reduce(function(acc, element){
        return acc + element
      })

  })
  }
}
