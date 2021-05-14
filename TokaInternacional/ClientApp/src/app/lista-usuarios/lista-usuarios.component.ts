import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl, MatTableDataSource } from '@angular/material';
import { UsuarioServiceService } from '../services/usuario-service.service';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { ModalesService } from '../services/modales.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalCrearUsuarioComponent } from '../modales-usuario/modal-crear-usuario/modal-crear-usuario.component';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
  userDetails; 
  listapersonas:any[]=[];
  dataSource: MatTableDataSource<any>;

  constructor(private router: Router, private loginService: LoginService,
    private usuarioService: UsuarioServiceService,
    private modal: ModalesService,
    private snackBar:MatSnackBar,
    private paginador: MatPaginatorIntl) { }

    displayedColumns: string[] = [
      'idUsuario',
      'NombreUsuario',
      'Password',
      'FechaCreacion',
      'Acciones'
    ];  
  ngOnInit() {
    this.obtenerListaUsuarios();
    if(this.usuarioService.invocarTraerContenidoSubscription == undefined){
      this.usuarioService.invocarTraerContenidoSubscription = 
      this.usuarioService.invocarTraerContenido.subscribe(()=>{
        this.obtenerListaUsuarios();
      })
    }
  }
  obtenerListaUsuarios(){
    this.usuarioService.getUsuarios().subscribe((res:any[])=>{
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
    this.modal.abrirDialogoLateral(ModalCrearUsuarioComponent, datos)
  }

}
