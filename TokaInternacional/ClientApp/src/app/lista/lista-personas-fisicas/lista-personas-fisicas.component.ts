import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { PersonasFisicasService } from '../../services/personas-fisicas.service';
import { ModalesService } from '../../services/modales.service';
import { ModalCrearComponent } from '../../modales-personas-fisicas/modal-crear/modal-crear.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lista-personas-fisicas',
  templateUrl: './lista-personas-fisicas.component.html',
  styleUrls: ['./lista-personas-fisicas.component.css']
})
export class ListaPersonasFisicasComponent implements OnInit {
  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
  userDetails; 
  listapersonas:any[]=[];
  dataSource: MatTableDataSource<any>;

  constructor(private router: Router, private loginService: LoginService,
    private personasFisicasService: PersonasFisicasService,
    private modal: ModalesService,
    private snackBar:MatSnackBar,
    private paginador: MatPaginatorIntl) { }
  
    displayedColumns: string[] = [
    'idPersonaFisica',
    'Fecha de Registro', 
    'Fecha de Actualizacion', 
    'Nombre', 
    'RFC', 
    'Fecha de Nacimiento',
    'Acciones'];  

  ngOnInit() {
    this.loginService.invocarMetodoRefreshLogin();
    this.loginService.getUserProfile().subscribe((res:any[])=>{
      this.userDetails = res; 
      console.log(res);
    });
    this.obtenerPersonasFisicas();
    if(this.personasFisicasService.invocarTraerContenidoSubscription == undefined){
      this.personasFisicasService.invocarTraerContenidoSubscription = 
      this.personasFisicasService.invocarTraerContenido.subscribe(()=>{
        this.obtenerPersonasFisicas();
      })
    }
    this.paginador.itemsPerPageLabel = "Registros por página";
    this.paginador.nextPageLabel = "Página siguiente";
    this.paginador.previousPageLabel = "Página anterior";
    this.paginador.firstPageLabel = "Primera página";
    this.paginador.lastPageLabel = "Última página";
  }
  obtenerPersonasFisicas(){
    this.personasFisicasService.getPersonasFisicas().subscribe((res:any[])=>{
      console.log(res);
      if(res){
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.listapersonas = res; 
        console.log(this.listapersonas);
      }else{
        this.dataSource = new MatTableDataSource([]);
      }
    }, (error=>{
      this.dataSource = new MatTableDataSource([]);
    }))
  }

  abrirModalAgregar(){
    let datos ={
      esNuevoRegistro:true
    }
    this.modal.abrirDialogoLateral(ModalCrearComponent, datos)
  }
  abrirModalEditar(idPersonaFisica){
    let datos ={
      persona: this.listapersonas.filter(x=>x.idPersonaFisica===idPersonaFisica),
      esNuevoRegistro:false
    }
    this.modal.abrirDialogoLateral(ModalCrearComponent, datos)
  }
  eliminarRegistro(idPersonaFisica){
    this.personasFisicasService.DeleteTbPersonasFisicas(idPersonaFisica).subscribe(res=>{
      this.snackBar.open("registro eliminado");
      this.obtenerPersonasFisicas();
    })
  }
  CerrarSesion(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
