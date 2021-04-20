import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  router: any;

  constructor(private _http: HttpClient ) { }
  getProducts( limit , catagory)
  {
    
    let params = new HttpParams();


    params = params.append('limit', limit);
    params = params.append('category', catagory);
    return this._http.get(`${environment.baseUrl}/products` , {params})
  }
  getProductById(id) {
    return this._http.get(`${environment.baseUrl}/products/${id}`);
  }
  getSearched(productName) {
    console.log(productName)
    let params = new HttpParams();
     
    params = params.append('q', productName);
    return this._http.get(`${environment.baseUrl}/products` , { params })
  }
 
}
