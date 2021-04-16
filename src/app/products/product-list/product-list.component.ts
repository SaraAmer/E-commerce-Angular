import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { Product } from '../models/products/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products:Product[]
  page = 1;
  count = 0;
  tableSize = 7;
  tableSizes = [3, 6, 9, 12];
    constructor(private __productService : ProductsService) { }
  
    ngOnInit(): void {
  
      this.fetchProducts();
    }
  fetchProducts(){
    this.__productService.getProducts().subscribe((res: any) => {
      this.products=res.data
      console.log(res.total_pages)
  
    });
  }
  
    onTableDataChange(event){
      this.page = event;
      this.fetchProducts();
    }  
  
    onTableSizeChange(event): void {
      this.tableSize = event.target.value;
      this.page = 1;
      this.fetchProducts();
    }  

}
