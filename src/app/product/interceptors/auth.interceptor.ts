import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService:AuthService,
    private router:Router,
  ){}

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {


    return next.handle(req).pipe(
      catchError( e => {

          // Unahutorized
          if(e.status == 401){

            // Verificar si estamos o no estamos autenticados
            if(this.authService.isAuthenticated()){
              this.authService.logout();
            }

            this.router.navigateByUrl('/login');
          }

          // Forbidden
          if(e.status == 403){
            Swal.fire("Acceso denegado",`Hola ${this.authService.user.username} no tienes acceso a este recurso here jeje`,"warning");
            this.router.navigateByUrl('/');
          }

          return throwError(() => e);
      })
    );

  }


}
