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
  constructor(private __productService : ProductsService) { }

  ngOnInit(): void {
    this.__productService.getProducts().subscribe((res: any) => {
      this.products=res.data
      console.log(res.data)

    });
  }

}
