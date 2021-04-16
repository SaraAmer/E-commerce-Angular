import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
@Input() product;
name = localStorage.getItem('loginUser');

  constructor(private _loginService: AuthService) {

   }

  ngOnInit(): void {
    this._loginService.authUser.subscribe((data : string)=>{
      this.name = data
       console.log(data);
  });}
card(){
let product ={
  userName :this.name,
  productname : this.product.Name,
  productPrice : this.product.Price,
  productPic :  this.product.ProductPicUrl,
  quantity : 1
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
 // product =[this.name,this.product.Name , this.product.Price , this.product.ProductPicUrl]
 

}
}
