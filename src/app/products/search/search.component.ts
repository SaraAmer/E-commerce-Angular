import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/products/product.model';
import { CartService } from '../service/cart.service';
import { ProductsService } from '../service/products.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
 products : Product[]
 searchvalue : string;
 quantity :Number=1;
 constructor(private _productService : ProductsService , private route: ActivatedRoute , public cart: CartService , private _router:Router) {

   
   }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.searchvalue = params['searchValue'];
      if(this.searchvalue)
      {
        this._productService.getSearched(this.searchvalue).subscribe((res:any)=>{
          this.products= res.data;
          console.log(this.products.length)
        },(err:any)=>
        {
          this._router.navigate(['error'])
        });
      }
   
  });

}


}
