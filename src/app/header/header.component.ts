import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { CartService } from '../products/service/cart.service';
import { ProductsService } from '../products/service/products.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
name = localStorage.getItem('loginUser');
cartProducts=[];
userCart=[];
length :Number= 0;
@Output() newItemEvent = new EventEmitter<string>();
searchvalue : string="";
  constructor(public _loginservice : AuthService , private _router: Router , 
    private _productsService : ProductsService ,
    private cart:CartService) {
 
   }

  ngOnInit(): void {
   this._loginservice.authUser.subscribe((data : string)=>{
     this.name = data
     
    })
    this.cart.quantity.subscribe((data : Number)=>{
      this.length = data
      
     })
 

  }
logout()
{
  this._router.navigate(['/products'])
   localStorage.removeItem('loginUser');
   this._loginservice.broadcastUser("");
  //  this._loginservice.broadcastAuthValue(false)
  
   this._router.navigate['/products']
   
}
search(value : string){
  console.log("search")
  this.newItemEvent.emit(value);
  this._router.navigate(['search' ,this.searchvalue]);
  
}
}