import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { Product } from '../models/products/product.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products:Product[]
  page = 1;
  count :Number = 0;
  tableSize = 12;
  tableSizes = [12, 9, 6, 3];
  category = new Set();
  setValue =[];
  chosenCategory: string="";
  private _routeParamsSub: Subscription;
  private _totalItemSub: Subscription;
    constructor(private __productService : ProductsService , private _router:Router) { 


    }

    ngOnInit(): void {
      this.gettotalItems()
     

      
    }
  async gettotalItems()
  {
     
    this._totalItemSub=this.__productService.getProducts(10, this.chosenCategory).subscribe((res: any) => {
      this.count = res.total_items
      this.fetchProducts(this.count)

      
  
      } , (err:any)=>{
        console.log('errrorcount')
        this._router.navigate(['error']);
  
      
      });  

    }

   fetchProducts(count){

    this._routeParamsSub=this.__productService.getProducts(count, this.chosenCategory).subscribe((res: any) => {
    this.products=res.data
    this.count = res.total_items
    } , (err:any)=>{
      console.log('errror fetch')
      this._router.navigate(['error']);

    
    });
  }

    onTableDataChange(event){
      this.products=[];
      this.page = event;
      this.fetchProducts(this.count);
    }

    onTableSizeChange(event): void {
      this.tableSize = event.target.value;
      this.page = 1;
    
      this.fetchProducts(this.count);
    }
    onCategoryChange(event): void {
      this.products=[];
this.chosenCategory=event.target.value;

 this.fetchProducts(this.count);
   
    }
    categoryfill()
    {
      
      this.products.forEach((product)=>
      {
        this.category.add(product.Category);

      })
      return Array.from(this.category.values())
     
    }
    // ngOnDestroy()
    // {
    //  this._routeParamsSub.unsubscribe();
    // }

}
