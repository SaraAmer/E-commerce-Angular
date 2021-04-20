import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { Product } from '../models/products/product.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products:Product[]
  page = 1;
  count = 0;
  tableSize = 12;
  tableSizes = [12, 9, 6, 3];
  category = new Set();
  setValue =[];
  chosenCategory: string="";
    constructor(private __productService : ProductsService , private _router:Router) { }

    ngOnInit(): void {

      this.fetchProducts();
    }
  fetchProducts(){

    this.__productService.getProducts(this.page , this.tableSize , this.chosenCategory).subscribe((res: any) => {
    console.log(res.total_items)
    this.count = res.total_items
    this.products=res.data
 

    } , (err:any)=>{
      this._router.navigate(['error']);

    
    });
  }

    onTableDataChange(event){
      this.products=[];
      this.page = event;
      this.fetchProducts();
    }

    onTableSizeChange(event): void {
      this.tableSize = event.target.value;
      this.page = 1;
      this.fetchProducts();
    }
    onCategoryChange(event): void {
this.chosenCategory=event.target.value;
this.fetchProducts();
   
    }
    categoryfill()
    {
      this.products.forEach((product)=>
      {
        this.category.add(product.Category);

      })
      return Array.from(this.category.values())
     
    }

}
