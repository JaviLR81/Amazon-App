import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class HomeService {


  private _baseURL:string = environment.baseURL;

  constructor(private http:HttpClient) { }


  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(`${this._baseURL}/products`);
  }


}
