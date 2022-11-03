import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Brand, Product, Tag } from 'src/app/shared/interfaces/product.interface';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _baseURL = environment.baseURL;

  constructor(
    private http:HttpClient,
    private router:Router,
  ) { }

  getProductDetail(id:number): Observable<Product>{
    return this.http.get<Product>(`${this._baseURL}/products/${id}`)
      .pipe(
        catchError( (e) => {
          this.router.navigateByUrl('/');
          Swal.fire('Oops',"El producto buscado no existe","info");
          return throwError(() => e);
        })
      )
    ;
  }

  uploadProductImage(image:File,id:number):Observable<Product>{

    let formData = new FormData();
    formData.append('file',image);
    formData.append('id',id.toString());

    return this.http.post(`${this._baseURL}/products/upload`,formData)
      .pipe(
        tap( (resp:any) => {}
        ),
        map( (resp:any) => resp.product as Product)
      );
  }

  updateProduct(id:number,product:Product):Observable<Product>{
    return this.http.put<Product>(`${this._baseURL}/products/${id}`,product)
      .pipe(
        map((resp:any) => resp.product as Product)
      );
  }

  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(`${this._baseURL}/products`);
  }

  saveProduct(product:Product): Observable<Product>{
    return this.http.post<Product>(`${this._baseURL}/products`,product)
      .pipe(
        map( (resp:any) => resp.product as Product )
      )
    ;
  }

  /** Tags */
  getTags():Observable<Tag[]>{
    return this.http.get<Tag[]>(`${this._baseURL}/products/tags`)
    .pipe(
        catchError( err => {
          console.log("Ha ocurrido un error al tratar de cargar las tags");
          return throwError(() => err);
        })
      )
    ;
  }


  /** Brands */
  getBrands():Observable<Brand[]>{
    return this.http.get<Brand[]>(`${this._baseURL}/products/brands`)
        .pipe(
          catchError( err => {
            console.log("Ha ocurrido un error al tratar de cargar las marcas");
            return throwError(() => err);
          })
        )
    ;
  }


}
