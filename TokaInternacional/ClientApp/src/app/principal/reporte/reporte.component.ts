import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { PersonasFisicasService } from '../../services/personas-fisicas.service';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {
  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
  dataSource: MatTableDataSource<any>;

  constructor(private router: Router,
    private personasFisicasService: PersonasFisicasService,
    private paginador: MatPaginatorIntl) { }
  
  Registers=[];
  displayedColumns: string[] = [
    'idCliente',
    'FechaRegistroEmpresa', 
    'RazonSocial', 
    'Sucursal', 
    'Nombre'];  
  ngOnInit() {
    this.consumirtoken();
    this.filtrarRegistrosLocal();
    this.paginador.itemsPerPageLabel = "Registros por página";
    this.paginador.nextPageLabel = "Página siguiente";
    this.paginador.previousPageLabel = "Página anterior";
    this.paginador.firstPageLabel = "Primera página";
    this.paginador.lastPageLabel = "Última página";
  }
  consumirtoken(){
    let usuario = {
      "Username": "ucand0021",
      "Password": "yNDVARG80sr@dDPc2yCT!"
    }
    this.personasFisicasService.consumirToken(usuario).subscribe(res=>{
      console.log(res);
    })
  }
  filtrarRegistros(){
    this.personasFisicasService.obtenerCandidatos().subscribe(res=>{
      console.log(res);
    })
  }
  filtrarRegistrosLocal(){
    this.personasFisicasService.obtenerCandidatosLocal().subscribe((res:any[])=>{
      console.log(res.Data);
      this.dataSource = new MatTableDataSource(res.Data);
      this.dataSource.paginator = this.paginator;
      this.Registers = res.Data;
    })
  }
  createReport() {
    this.createCSV();
  }
  createCSV() {
    const data = [];

    const header = {
      IdCliente: 'Id del Cliente',
      FechaRegistroEmpresa: 'Fecha de Registro',
      RazonSocial: 'Razón Social',
      RFC: 'RFC',
      Sucursal: 'Sucursal',
      IdEmpleado: 'Id del Empleado',
      Nombre: 'Nombre ',
      Paterno: 'Apellido Paterno',
      Materno: 'Apellido Materno', 
    };

    data.push(header);

    for (const key of this.Registers) {
      const item = {
        IdCliente: key.IdCliente,
        FechaRegistroEmpresa: key.FechaRegistroEmpresa ? key.FechaRegistroEmpresa: 'Pendiente de registro' ,
        RazonSocial: key.RazonSocial,
        RFC: key.RFC,
        Sucursal: key.Sucursal,
        IdEmpleado: key.IdEmpleado,
        Nombre: key.Nombre,
        Paterno: key.Paterno,
        Materno: key.Materno,
        IdViaje: key.IdViaje,
      };

      data.push(item);
    }
    new AngularCsv(data, 'reporte');
  }



}
