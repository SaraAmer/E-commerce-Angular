import { keyframes } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
   cartProducts = [];
   userCart=[];
   quantity =[];
  
   name = localStorage.getItem('loginUser');
   renderedValue: string ="0";this
 
   ariaLabelLess: string;
   ariaLabelMore: string;
  constructor(private _loginService:AuthService , public cart:CartService) { }

  ngOnInit(): void {
      this._loginService.authUser.subscribe((data : string)=>{
      this.name = data

     })

    for (let i = 0; i<localStorage.length; i++) {

      if(localStorage.key(i) != "loginUser")
      {

         this.cartProducts[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
        
      }

    }


    for (let product of this.cartProducts)
    {
      if(product)
      {
        if(product.userName == this.name)
        {
          this.userCart.push(product)
          this.quantity.push(product.quantity)

        }

      }


    }

    
 
    


  }



  toggleMore = (product) => {
 
   if(product.quantity < product.productQuantity)
   {
    product.quantity++;
    
    localStorage.removeItem(`${product.productId} ${this.name}`)
    
    localStorage.setItem(`${product.productId} ${this.name}` , JSON.stringify(product));

    this.cart.broadcartQuantity()
    this.cart.settotal();
   }
   else{
     alert(`There is only ${product.productQuantity} available of this product in our store`)
   }
 
  };

  toggleLess = (product) => {
    if(product.quantity > 1)
    {
     product.quantity--;
 
     localStorage.removeItem(`${product.productId} ${this.name}`)
     localStorage.setItem(`${product.productId} ${this.name}` , JSON.stringify(product));

    }
    else{
     let answer =  confirm("are You Sure you want to delete This Item");
     if(answer)
     {
       localStorage.removeItem(`${product.productId} ${this.name}`)
       window.location.reload()
     }
    }

    this.cart.broadcartQuantity()
    this.cart.settotal();
  
  };

}
