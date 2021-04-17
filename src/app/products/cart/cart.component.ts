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
   total :number = 0;
   name = localStorage.getItem('loginUser');
   renderedValue: string ="0";
value: number = 0;
step: number = 1;
min: number = 0;
max: number =10 ;
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
     this.getotal();
     console.log(this.total)


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
  toggleMore = () => {
    if (this.step + this.value <= this.max) {
      this.value = this.value + this.step;
      this.renderedValue = this.value.toString() + this.symbol;
    }
  };

  toggleLess = () => {
    if (this.value - this.step >= this.min) {
      this.value = this.value - this.step;
      this.renderedValue = this.value.toString() + this.symbol;
    }
  };

}
