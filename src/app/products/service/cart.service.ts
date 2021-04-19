import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Product } from '../models/products/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnInit{
  name = localStorage.getItem('loginUser');
  errors=[];
  constructor(private _loginService: AuthService ,  private _router: Router) { }

  ngOnInit(): void {
    this._loginService.authUser.subscribe((data : string)=>{
      this.name = data
       console.log(data);
  });}

  cart(productTOCheck:Product , quantity)
  {
    if(productTOCheck.Quantity>=quantity)
    {
      if(this._loginService.isLoggedIn)
      {
        let product ={
         
          userName :this.name,
          productId:productTOCheck.ProductId,
          productQuantity:productTOCheck.Quantity,
          productname :productTOCheck.Name,
          productPrice : productTOCheck.Price,
          productPic :  productTOCheck.ProductPicUrl,
          quantity : quantity
        };
        if(!localStorage.getItem(`${productTOCheck.ProductId} ${this.name}`))
        {
          localStorage.setItem(`${productTOCheck.ProductId} ${this.name}` , JSON.stringify(product));
        
        }
        else
        {
        let productincart= JSON.parse(localStorage.getItem(`${productTOCheck.ProductId} ${this.name}`)); 
        localStorage.removeItem(`${productTOCheck.ProductId} ${this.name}`);
        product.quantity= Number(productincart.quantity)+Number(quantity);
        localStorage.setItem(`${productTOCheck.ProductId} ${this.name}` , JSON.stringify(product));
        
        }
    
      }
      else{
        this._router.navigate(['login'])
      
      }
      
    }
    else {
     alert(`there is only ${productTOCheck.Quantity} available`)

    }
 
  }
  isInCart(product){
    if(localStorage.getItem(`${product.ProductId} ${this.name}`)){
      return true;
    }
    else{
      return false;
    }
  }
  deleteFromCart(product)
{
  console.log(product)
  let answer =  confirm("are You Sure you want to delete This Item");
  if(answer)
  {
    console.log(product.productId);
    localStorage.removeItem(`${product.ProductId} ${this.name}`)

  }
}

}
