import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Product } from '../models/products/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnInit{
  name = localStorage.getItem('loginUser');
  cartProducts=[];
userCart=[];
total = 0;
  private _cartquantity = new BehaviorSubject<Number>(this.userCart.length);
  constructor(private _loginService: AuthService ,  private _router: Router) { 

 
    this.broadcartQuantity()
    this.settotal();
  }

  ngOnInit(): void {
    this._loginService.authUser.subscribe((data : string)=>{
      this.name = data
       console.log(data);
  });

 
}

  cart(productTOCheck:Product , quantity)
  {
    console.log(this.name)
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
           this.userCart.push(product)
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
    this.broadcartQuantity()
    this.settotal();
 
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
 
  let answer =  confirm("are You Sure you want to delete This Item");
  if(answer)
  {
    console.log(product.productId);
    localStorage.removeItem(`${product.ProductId} ${this.name}`)
    this.broadcartQuantity();
    this.settotal();

  }
}

broadcartQuantity(){
  this.cartProducts=[]
  this.userCart=[]
  for (let i = 0; i<localStorage.length; i++) {

    if(localStorage.key(i) != "loginUser" )
    {

       this.cartProducts[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
      
    }

  }
  for (let i = 0 ; i< this.cartProducts.length; i++)
  {
    if(this.cartProducts[i])
    {
      if(this.cartProducts[i].userName == this.name)
      {
        this.userCart.push(this.cartProducts[i])
       

      }

    }


  }

  this._cartquantity.next(this.userCart.length);

}
get quantity():Observable<Number>{
  return this._cartquantity.asObservable();
}
settotal()
{
  this.total=0;
  this.userCart.forEach((product) =>{
    console.log(product['productPrice']);
    console.log(product['quantity'])
   this.total += product['productPrice']*product['quantity'];
  
  

  })
}
gettotal(){
  return this.total;
}


}
