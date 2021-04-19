import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { NgxPaginationModule } from 'ngx-pagination';

import { CartComponent } from './cart/cart.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsDetailsComponent } from './products-details/products-details.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProductsComponent,
    ProductItemComponent,
    CartComponent,
    ProductListComponent,
    ProductsDetailsComponent,
    SearchComponent,
    
  ],
  imports: [
    NgxPaginationModule,
    CommonModule,
    ProductsRoutingModule,
    FormsModule
  ],
  exports: [NgxPaginationModule]
})
export class ProductsModule { }
