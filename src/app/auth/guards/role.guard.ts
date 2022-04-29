import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private authService:AuthService,
    private router:Router,
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>  | boolean {

      let role:string = route.data['role'] as string;
      console.log("~ role", role)

      // TODO: En mi caso no se veia necesario pero en el del profe si
      // TODO: De que se ejecute un guard antes de otro por eso aquí igual validamos lo del otro guard
      // if(!this.authService.isAuthenticated()){
      //   this.router.navigateByUrl('/auth/login');
      //   return false;
      // }


      if(this.authService.hasRole(role)){
        return true;
      }

      Swal.fire("Acceso denegado",`Hola ${this.authService.user.username} no tienes acceso a este recurso here jeje`,"warning");
      this.router.navigateByUrl('/');
      return false;
  }

}
