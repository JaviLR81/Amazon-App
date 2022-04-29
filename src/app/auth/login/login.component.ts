import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../interfaces/user.interface';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  user:User = {
    username: 'Javier',
    password: '123456'
  } as User;



  constructor(
    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
    if(this.isAuthenticated()){
      Swal.fire('Login',` Hola ${this.authService.user.username} ya estas autenticado`,'info');
      this.router.navigateByUrl('/clientes');
    }
  }

  login(){

    if(!this.user.username || !this.user.password ){
      Swal.fire('Error','Las credenciales no estan completas','error');
      return;
    }

    this.authService.login(this.user)
      .subscribe({
        next: (resp:any) => {
          console.log("~ resp", resp)

          // When login is correct we need to register the user and token in session storage
          this.router.navigateByUrl('/clientes');
          this.authService.saveToken(resp.access_token);
          this.authService.saveUser(resp.access_token);

          let user:User = this.authService.user;
          Swal.fire('Correcto',`Bienvenido ${user.username} has iniciado sesión con exito`,'success');
        },
        error : e => {

          if(e.status == 400){
            Swal.fire('Error','Las credenciales son incorrectas','error');
          }

          console.log(e);
        }
      })

  }

  isAuthenticated():boolean{
    return this.authService.isAuthenticated();
  }

}
