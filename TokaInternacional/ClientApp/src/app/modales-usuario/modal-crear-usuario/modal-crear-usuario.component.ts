import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ModulosComponent } from '../../principal/modulos/modulos.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { UsuarioServiceService } from '../../services/usuario-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-crear-usuario',
  templateUrl: './modal-crear-usuario.component.html',
  styleUrls: ['./modal-crear-usuario.component.css']
})
export class ModalCrearUsuarioComponent implements OnInit {

  constructor(public dialogRevisionRef: MatDialogRef<ModulosComponent>,
    private snackBar:MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private datePipe: DatePipe,
    private usuarioService: UsuarioServiceService) { }

  registroUsuarioIngreso : FormGroup;  
  ngOnInit() {
    if(this.data.esNuevoRegistro){
      this.registroUsuarioIngreso = new FormGroup({
        nombreUsuario: new FormControl(null, [Validators.required]),
        password: new FormControl(null, [Validators.required])
      });
    }
  }
  guardar(){
    if(this.data.esNuevoRegistro){
      this.usuarioService.registrarUsuario(this.registroUsuarioIngreso.value).subscribe(res=>{
        console.log(res);
        this.snackBar.open("registro exitoso",'OK',{ duration: 5000 });
        this.usuarioService.invocarMetodoTraerContenido();
      });
    }
  }
  validarConfirmacion(){
    if(this.registroUsuarioIngreso.valid){
      this.guardar()
    }else{
      this.registroUsuarioIngreso.markAllAsTouched();
      this.snackBar.open("error al ingresar los datos",'Error',{duration: 5000});
    }
  }
  salir(){
    this.dialogRevisionRef.close();
  }
}
