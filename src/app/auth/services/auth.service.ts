import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import Swal from 'sweetalert2';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseURL = 'http://localhost:4200/oauth/token';

  private _user!:User;
  private _token!:string;

  constructor(
    private router:Router,
    private http:HttpClient
  ) {}


  login(user:User):Observable<any>{

    // btoa = Convertidos a base 64
    const credentials = btoa('angular_app:12345');

    let headers = new HttpHeaders({
      "Content-Type":'application/x-www-form-urlencoded',
      "Authorization":'Basic ' + credentials
    });

    let params = new URLSearchParams();
      params.set('grant_type','password');
      params.set('username',user.username);
      params.set('password',user.password);

    // return this.http.post(`${this._baseURL}`,params,{headers});

    let mockSprinData = {
      access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbmZvX2FkaWNpb25hbCI6IkhvbGEgcXVlIHRhbCFhbmRyZXMiLCJ1c2VyX25hbWUiOiJhbmRyZXMiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiYXBlbGxpZG8iOiJndXptYW4iLCJleHAiOjE2NTExNjE3OTYsIm5vbWJyZSI6ImFuZHJlcyIsImF1dGhvcml0aWVzIjpbIlJPTEVfVVNFUiJdLCJqdGkiOiJmYjU1NGJiZS1mNGEyLTQyZGItYTQxYS1lNDc3YzVhZjIzN2UiLCJlbWFpbCI6ImFuZHJlc0BnbWFpbC5jb20iLCJjbGllbnRfaWQiOiJhbmd1bGFyX2FwcCJ9.GE7zLM6QgFig2zNrl1pl399Oa6id7xNtQw9a3fh0qyM",
      token_type: "bearer",
      refresh_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbmZvX2FkaWNpb25hbCI6IkhvbGEgcXVlIHRhbCFhbmRyZXMiLCJ1c2VyX25hbWUiOiJhbmRyZXMiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiYXBlbGxpZG8iOiJndXptYW4iLCJhdGkiOiJmYjU1NGJiZS1mNGEyLTQyZGItYTQxYS1lNDc3YzVhZjIzN2UiLCJleHAiOjE2NTExNjE3OTYsIm5vbWJyZSI6ImFuZHJlcyIsImF1dGhvcml0aWVzIjpbIlJPTEVfVVNFUiJdLCJqdGkiOiI4NGMyNjc0MS1lZmY4LTRhMjQtYjE4Ny0wMjgyZDc3Y2QwNGEiLCJlbWFpbCI6ImFuZHJlc0BnbWFpbC5jb20iLCJjbGllbnRfaWQiOiJhbmd1bGFyX2FwcCJ9.MSZ3RB2BBr20RaOmxB-XCBZyR8PnTzqKhJojy2JHUCA",
      expires_in: 3599,
      scope: "read write",
      info_adicional: "Hola que tal!andres",
      apellido: "guzman",
      nombre: "andres",
      email: "andres@gmail.com",
      jti: "fb554bbe-f4a2-42db-a41a-e477c5af237e"
    };

    return of(mockSprinData);

  }

  saveUser(token:string){

    // TODO: Maybe we need to validate the inexistence of token in return for the payload
    let payload = this.getDataFromToken(token);
    console.log("~ payload", payload)


    let user:User = {} as User;

    // TODO: Also we should add all parameters in real case
    user.name = payload.nombre;
    user.lastName = payload.apellido;
    user.email = payload.email;
    user.username = payload.user_name;
    user.roles = payload.authorities;

    sessionStorage.setItem('user',JSON.stringify(user));
  }

  saveToken(token:string){
      // In this point the token should not be null
      this._token = token;
      sessionStorage.setItem('token',token);
  }

  getDataFromToken(token:string):any{
      if(token != null){
        return JSON.parse(atob(token.split('.')[1]));
      }

      return null;
  }

  get user():User{
    if (this._user != null) {
      return {...this._user};
    } else if(this._user == null && sessionStorage.getItem('user') != null) {
      this._user = JSON.parse(sessionStorage.getItem('user')!) as User;
      return {...this._user};
    }else{
      let user:User = {} as User;
      return user;
    }
  }

  get token():string{
    if (this._token != null) {
      return this._token;
    } else if(this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token')!;
      return this._token;
    }else{
     return null as any;
    }
  }

  /**
   * Método para verificar si estamos como tal autenticados en la aplicación
   */
  isAuthenticated(): boolean {
    // En caso el token que estemos pasando sea nulo va a devolver nulo
    let payload = this.getDataFromToken(this.token);

    if(payload != null && payload.user_name && payload.user_name.length > 0){
      return true;
    }

    return false;
  }

  /**
   * Clean the completely data from session and variables
   */
  logout(){
    sessionStorage.clear();
    this._token = null as any;
    this._user = null as any;
    Swal.fire('Logout','Ha cerrado sesón exitosamente','info');
    this.router.navigateByUrl("/auth/login");
  }

  hasRole(role:string):boolean{
    // TODO: We add this because in an interface is different the object initialization than a class
    // TODO: Reference to getter  get user():User that returns let user:user = {} as User;
    // TODO: Maybe an initilization { roles = [] } could work to avoid the error to consult and undefined array or use a class jeje

    if(this.user.roles &&  this.user.roles.includes(role)){
      return true;
    }else{
      return false;
    }
  }

}
