import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  
  invocarRefreshLogin = new EventEmitter;
  invocarRefreshLoginSubscription: Subscription;


  iniciarSesion(formdata){
    return this.http.post(`${environment.apiUrl}` + 'usuarios/Login', formdata); //lamando al endpoint -- [controlador]/[endpoint]
  }
  getUserProfile() {
    //variable para simular un httpheader
    var tokenHeader = new HttpHeaders({'Authorization':'Bearer '+ localStorage.getItem('token')});
    return this.http.get(`${environment.apiUrl}` + 'usuarios/GetUsuario', {headers:tokenHeader} );
  }
  //Invocar Metodo 
  public invocarMetodoRefreshLogin() {
    this.invocarRefreshLogin.emit();
  }
}
