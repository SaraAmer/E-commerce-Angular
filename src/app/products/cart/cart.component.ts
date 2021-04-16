import { keyframes } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
   cartProducts = [];
   userCart=[];
   name = localStorage.getItem('loginUser');
  constructor(private _loginService:AuthService) { }

  ngOnInit(): void {
      this._loginService.authUser.subscribe((data : string)=>{
      this.name = data
     
     })
   
    for (let i = 0; i<localStorage.length; i++) {
      
      if(localStorage.key(i) != "loginUser")
      {
     
         this.cartProducts[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));  
          // console.log("product"+JSON.parse(localStorage.getItem(localStorage.key(i).userName)))
     
      }
      
    }
   
    
    for (let product of this.cartProducts)
    {
      if(product)
      {
        if(product.userName == this.name)
        {
          this.userCart.push(product)
        }

      }
   
    
    }
    // console.log('products:' + (this.cartProducts[0].userName))
 
  }
  cartdelete(){

  }

}
