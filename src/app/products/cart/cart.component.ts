import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
   archive = [];
  constructor() { }

  ngOnInit(): void {
   
    for (var i = 0; i<localStorage.length; i++) {
       this.archive[i] = localStorage.getItem(localStorage.key(i));     
    }
  
    console.log(this.archive)
  }

}
