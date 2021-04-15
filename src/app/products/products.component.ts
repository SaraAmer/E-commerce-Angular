import { Component, OnInit } from '@angular/core';
import { Product } from './models/products/product.model';
import { ProductsService } from './service/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
products:Product[]
  constructor(private __productService : ProductsService) { }

  ngOnInit(): void {
    this.__productService.getProducts().subscribe((res: any) => {
      this.products=res.data
      console.log(res.data)

    });
  }

}
