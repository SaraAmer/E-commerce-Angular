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
  tableSize = 3;
  tableSizes = [3, 6, 9, 12];
    constructor(private __productService : ProductsService ) { }

    ngOnInit(): void {

      this.fetchProducts();
    }
  fetchProducts(){

    this.__productService.getProducts(this.page , this.tableSize).subscribe((res: any) => {
    console.log(res.total_items)
    this.count = res.total_items
    this.products=res.data


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

}
