import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Product } from '../models/products/product.model';
import { CartService } from '../service/cart.service';
import { ProductsService } from '../service/products.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss']
})
export class ProductsDetailsComponent implements OnInit {
  private _routeParamsSub: Subscription;
  product: Product;
  name = localStorage.getItem('loginUser');
  productQuantity :Number = 1;
  constructor(private _route: ActivatedRoute,
    private _productService:ProductsService,
  
    public cart:CartService
  ) { 
    
  }

  ngOnInit(): void {
    this._routeParamsSub = this._route.paramMap.subscribe(paramMap => {
      if (paramMap.has('id')) {
        this._productService.getProductById(paramMap.get('id')).subscribe((res: any) => {
          this.product = res.data;
        });
      }
    });
  }


  ngOnDestroy(): void {
    this._routeParamsSub.unsubscribe();
  }

}



