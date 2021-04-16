import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsDetailsComponent } from './products-details/products-details.component';
import { ProductsComponent } from './products.component';

const routes: Routes = [{ path: '', component: ProductsComponent , children:[
  {path: 'cart' , component:CartComponent},
  {path : '' , component:ProductListComponent},
  {path: ':id',component:ProductsDetailsComponent}
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
