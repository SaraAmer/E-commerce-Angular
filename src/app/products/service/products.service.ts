import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _http: HttpClient) { }
  getProducts()
  {
    return this._http.get(`${environment.baseUrl}/products`)
  }
  getProductById(id) {
    return this._http.get(`${environment.baseUrl}/products/${id}`);
  }
}
