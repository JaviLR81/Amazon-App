import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Product } from 'src/app/shared/interfaces/product.interface';
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
    private authService:AuthService,
  ) { }


  /**
   * When we are using Spring-Security we need to send the headers content type
   */
  private httpHeaders = new HttpHeaders()
    .set("Content-Type","application/json");

  /**
   * Se uso pero fue Substituido por un interceptor que es algo más general AuthInterceptor
   */

  isNotAuthorized(e:any):boolean{

    // Unahutorized
    // Verificar si estamos o no estamos autenticados
    // TODO this constraint could leave a user when 401 is received  well in normal case its not a problem
    // TODO but in my case when i altered the map is an error to return a forbidden
    if(this.authService.isAuthenticated()){
      this.authService.logout();
    }

    if(e.status == 401){
      this.router.navigateByUrl('/login');
      return true;
    }

    // Forbidden
    if(e.status == 403){
      Swal.fire("Acceso denegado",`Hola ${this.authService.user.username} no tienes acceso a este recurso here jeje`,"warning");
      this.router.navigateByUrl('/');
      return true;
    }

    return false;
  }

  /**
   * Se uso pero se substituyo por el interceptor TokenInterceptor
   * @returns
   */
  private agregarAuthorizationHeader(){
    let token = this.authService.token;

    if(token != null){
      // Httpheaders es inmutable siempre devuelve una nueva instancia después de cada modificación
      return this.httpHeaders.append('Authorization','Bearer ' + token);
    }

    // Retornando las cabeceras por default
    return this.httpHeaders;

  }

  getProductDetail(id:number): Observable<Product>{
    return this.http.get<Product>(`${this._baseURL}/products/${id}`)
      .pipe(

        // TODO: Este map es solo para adaptar la funcionalidad debe de ser emovido
        // Simulando un error del 403
        // map( resp => {
        //   throw new HttpErrorResponse({status:403});
        // }),

        catchError( (e) => {

          // Se uso mejor un interceptor
          // Maybe we need a redirection to login or / depending http code status
          // if(this.isNotAuthorized(e)){
          //   return throwError(() => e);
          // }

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

    // Aquí creamos otros headers debido a que como lo estabamos manejando
    // era pasandole un JSON del Content-Type y aquí estamos enviando un formData
    let httpHeaders = new HttpHeaders();
    let token = this.authService.token;

    if(token != null){
      httpHeaders = httpHeaders.append('Authorization','Bearer ' + token);
    }

    return this.http.post(`${this._baseURL}/products/upload`,formData,{headers : httpHeaders})
      .pipe(
        tap( (resp:any) => {}
        ),
        map( (resp:any) => resp.product as Product),
        catchError(e => {

            // Maybe we need a redirection to login or / depending http code status
            // this.isNotAuthorized(e);
            return throwError(() => e);

        })
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

}
