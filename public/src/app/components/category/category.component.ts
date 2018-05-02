import { Component } from '@angular/core';
import { AmazonService } from '../../services/amazon.service';
import { ActivatedRoute, Router } from '@angular/router';
import  {GLOBAL} from '../../services/global';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html'
})
export class CategoryComponent {
public uno;
public dos;
public tres;
private amazo;
private tag;
public loading:boolean = true;

  constructor(public _amazonService:AmazonService, public activatedroute:ActivatedRoute, public route:Router) {
    setTimeout(activatedroute.params.subscribe(params => {
      _amazonService.SearchProducts(params['termi'],1)
          .subscribe((response:any) => {
            this.uno = response.result;
            this.loading = false;
          })
    }), 100)

    setTimeout(activatedroute.params.subscribe(params => {
      _amazonService.SearchProducts(params['termi'],2)
          .subscribe((response:any) => {
            this.dos = response.result;
            this.loading = false;
          })
    }), 200)

    setTimeout(activatedroute.params.subscribe(params => {
      _amazonService.SearchProducts(params['termi'],3)
          .subscribe((response:any) => {
            this.tres = response.result;
            this.loading = false;
          })
    }), 300)
    this.amazo = GLOBAL.urlAmazon;
    this.tag = GLOBAL.TagA;
  }


detailsProd(asin){
  this.route.navigate(['product',asin])
}


}
