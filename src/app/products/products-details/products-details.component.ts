import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../models/products/product.model';
import { ProductsService } from '../service/products.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss']
})
export class ProductsDetailsComponent implements OnInit {
  private _routeParamsSub: Subscription;
  product: Product;

  constructor(private _route: ActivatedRoute,
    private _productService:ProductsService
  ) { }

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



