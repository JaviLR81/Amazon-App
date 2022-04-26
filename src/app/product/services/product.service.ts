import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _baseURL = environment.baseURL;

  constructor(private http:HttpClient) { }

  getProductDetail(id:number): Observable<Product>{
    return this.http.get<Product>(`${this._baseURL}/products/${id}`);
  }


}
