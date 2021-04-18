import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
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
  name = localStorage.getItem('loginUser');
  productQuantity :string = "5";
  constructor(private _route: ActivatedRoute,
    private _productService:ProductsService,
    private _loginService: AuthService , 
    private _router: Router
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
card()
{
  
  console.log("qunh" + this.productQuantity)
  if(this._loginService.isLoggedIn)
  {
    let product ={
     
      userName :this.name,
      productID:this.product.ProductId,
      productQuantity:this.product.Quantity,
      productname : this.product.Name,
      productPrice : this.product.Price,
      productPic :  this.product.ProductPicUrl,
      quantity : this.productQuantity?this.productQuantity:1
    };
    if(!localStorage.getItem(`${this.product.ProductId} ${this.name}`))
    {
      localStorage.setItem(`${this.product.ProductId} ${this.name}` , JSON.stringify(product));
    
    }
    else
    {
    let productincart= JSON.parse(localStorage.getItem(`${this.product.ProductId} ${this.name}`)); 
    localStorage.removeItem(`${this.product.ProductId} ${this.name}`);
    product.quantity= productincart.quantity+1;
    localStorage.setItem(`${this.product.ProductId} ${this.name}` , JSON.stringify(product));
    
    }

  }
  else{
    this._router.navigate(['login'])
  
  }

}
}



