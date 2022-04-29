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
          // Verificar si estamos o no estamos autenticados
          // TODO this constraint could leave a user when 401 is received  well in normal case its not a problem
          // TODO but in my case when i altered the map is an error to return a forbidden
          if(this.authService.isAuthenticated()){
            this.authService.logout();
          }

          if(e.status == 401){
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
