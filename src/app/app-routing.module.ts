import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { LoginComponent } from './login/login.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductsComponent } from './products/products.component';
import { SearchComponent } from './products/search/search.component';

const routes: Routes = [


{path: "about" , component: AboutComponent},
{path: "contact" , component : ContactUsComponent},
{ path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
{path:'login' , component:LoginComponent},
{path:'search/:searchValue' , component :SearchComponent },
{path:"**" , component:ProductListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
