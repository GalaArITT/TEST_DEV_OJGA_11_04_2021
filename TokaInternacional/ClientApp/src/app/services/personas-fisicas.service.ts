import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subscription } from 'rxjs';
import { AuthGuard } from '../auth/auth.guard';
import { ApiService } from './api.service';



@Injectable({
  providedIn: 'root'
})

export class PersonasFisicasService {

  headers: any;
  headersFile = new HttpHeaders({});
  constructor(private http:HttpClient) { }
  
  setToken(token) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }
  //traer el listado al refrescar
  invocarTraerContenido = new EventEmitter;
  invocarTraerContenidoSubscription: Subscription;

  public getPersonasFisicas(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}TbPersonasFisicas/GetTbPersonasFisicas/`);
  }
  //PostTbPersonasFisicas
  public PostTbPersonasFisicas(datos){
    return this.http.post(`${environment.apiUrl}TbPersonasFisicas/PostTbPersonasFisicas/`, datos)
  }
  public PutTbPersonasFisicas(id,datos){
    return this.http.put(`${environment.apiUrl}TbPersonasFisicas/PutTbPersonasFisicas/${id}`, datos)
  }
  public DeleteTbPersonasFisicas(idPersona){
    return this.http.delete(`${environment.apiUrl}TbPersonasFisicas/DeleteTbPersonasFisicas/${idPersona}`)
  }
  //Invocar Metodo 
  public invocarMetodoTraerContenido() {
    this.invocarTraerContenido.emit();
  }
  public consumirToken(usuario){
    return this.http.post(`${environment.apiUrlLogin}`,usuario);  
  }
  public obtenerCandidatos() {
    const options = { headers: this.headers };
    return this.http.get(`${environment.apiUrlReporte}`, options);
  }
  public obtenerCandidatosLocal(): Observable<any[]>{
    return this.http.get<any[]>(`/assets/data/data.json`);
  }


}
