import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {

  constructor(private http:HttpClient) { }
  invocarTraerContenido = new EventEmitter;
  invocarTraerContenidoSubscription: Subscription;

  public getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}Usuarios/GetUsuarios/`);
  }
  public registrarUsuario(usuario:any){
    return this.http.post(`${environment.apiUrl}Usuarios/RegistrarUsuario/`,usuario);
  }
  public invocarMetodoTraerContenido() {
    this.invocarTraerContenido.emit();
  }
}
