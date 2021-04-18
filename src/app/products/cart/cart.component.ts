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
   quantity =[];
   total :number = 0;
   name = localStorage.getItem('loginUser');
   renderedValue: string ="0";
   value: number = 0;
   step: number = 1;
   min: number = 0;
   max: number = 10 ;
   symbol: string ="$";
   ariaLabelLess: string;
   ariaLabelMore: string;
  constructor(private _loginService:AuthService) { }

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

    
     this.getotal();
    


  }

  cartdelete(){

  }
  getotal()
  {
    this.userCart.forEach((product) =>{
      console.log(product['productPrice']);
      console.log(product['quantity'])
     this.total += product['productPrice']*product['quantity'];
    

    

    })

  }
  toggleMore = (product) => {
 
   if(product.quantity < product.productQuantity)
   {
    product.quantity++;
    this.total+= product.productPrice;
    localStorage.removeItem(`${product.productID} ${this.name}`)
    
    localStorage.setItem(`${product.productID} ${this.name}` , JSON.stringify(product));
   }
   else{
     alert(`There is only ${product.productQuantity} available of this product in our store`)
   }
 
  };

  toggleLess = (product) => {
    if(product.quantity > 1)
    {
     product.quantity--;
     this.total-= product.productPrice;
     localStorage.removeItem(`${product.productID} ${this.name}`)
     localStorage.setItem(`${product.productID} ${this.name}` , JSON.stringify(product));
    }
    else{
     let answer =  confirm("are You Sure you want to delete This Item");
     if(answer)
     {
       localStorage.removeItem(`${product.productID} ${this.name}`)
       window.location.reload()
     }
    }


  
  };

}
