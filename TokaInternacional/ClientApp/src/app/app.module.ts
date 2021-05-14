import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ListaPersonasFisicasComponent } from './lista/lista-personas-fisicas/lista-personas-fisicas.component';
import { AuthGuard } from './auth/auth.guard';
import { ModulosComponent } from './principal/modulos/modulos.component';
import { MatTabsModule } from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule, MatCheckboxModule, MatIconModule, MatNativeDateModule, MatPaginatorModule, MatRippleModule, MatSnackBarModule, MatSortModule, MatTooltipModule } from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import { ModalCrearComponent } from './modales-personas-fisicas/modal-crear/modal-crear.component';
import { ModalEditarComponent } from './modales-personas-fisicas/modal-editar/modal-editar.component';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { DatePipe } from '@angular/common';
import { ReporteComponent } from './principal/reporte/reporte.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { ModalCrearUsuarioComponent } from './modales-usuario/modal-crear-usuario/modal-crear-usuario.component';



@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    ModulosComponent,
    ListaPersonasFisicasComponent,
    ModalCrearComponent,
    ReporteComponent,
    ListaUsuariosComponent,
    ModalCrearComponent,
    ModalCrearUsuarioComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatPaginatorModule,
    ToastrModule.forRoot({progressBar:true}), //importar el toast con npm install ngx-toastr --save 10.0.4
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'login', component: HomeComponent },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      {path: 'listapersonas', component: ListaPersonasFisicasComponent,canActivate:[AuthGuard] },
      {path: 'modulos', component: ModulosComponent,canActivate:[AuthGuard] }
    ])
  ],
  providers: [
    NgDialogAnimationService,
    DatePipe
    
  ],
  bootstrap: [AppComponent, ModalCrearComponent],
  exports: [
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatNativeDateModule,
    MatRippleModule,
    MatCheckboxModule
  ],
  entryComponents:[
    ModalCrearComponent
  ]
})
export class AppModule { }
