import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { NgxPaginationModule } from 'ngx-pagination';

import { CartComponent } from './cart/cart.component';
import { ProductListComponent } from './product-list/product-list.component';



@NgModule({
  declarations: [
    ProductsComponent,
    ProductItemComponent,
    CartComponent,
    ProductListComponent
  ],
  imports: [
    NgxPaginationModule,
    CommonModule,
    ProductsRoutingModule
  ],
  exports: [NgxPaginationModule]
})
export class ProductsModule { }
