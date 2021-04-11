import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ModulosComponent } from '../../principal/modulos/modulos.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonasFisicasService } from '../../services/personas-fisicas.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-modal-crear',
  templateUrl: './modal-crear.component.html',
  styleUrls: ['./modal-crear.component.css']
})
export class ModalCrearComponent implements OnInit {

  constructor(public dialogRevisionRef: MatDialogRef<ModulosComponent>,
    private snackBar:MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private datePipe: DatePipe,
    private personasFisicasService: PersonasFisicasService) { }

  registroUsuario : FormGroup;
  GuardarBtnContenido=false;
  ngOnInit() {
    console.log(this.data);
 
    if(this.data.esNuevoRegistro){
      this.registroUsuario = new FormGroup({
        nombre: new FormControl(null, [Validators.required]),
        apellidoPaterno: new FormControl(null, [Validators.required]),
        apellidoMaterno: new FormControl(null, [Validators.required]),
        rfc: new FormControl(null, [Validators.required,Validators.pattern('/^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/') ]),
        fechaNacimiento: new FormControl(null, [Validators.required])
      });
    }else{
      this.registroUsuario = new FormGroup({
        idPersonaFisica: new FormControl(this.data.persona[0].idPersonaFisica),
        nombre: new FormControl(this.data.persona[0].nombre, [Validators.required]),
        apellidoPaterno: new FormControl(this.data.persona[0].apellidoPaterno, [Validators.required]),
        apellidoMaterno: new FormControl(this.data.persona[0].apellidoMaterno, [Validators.required]),
        rfc: new FormControl(this.data.persona[0].rfc, [Validators.required, Validators.pattern('/^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/') ]),
        fechaNacimiento: new FormControl(
          this.datePipe.transform(new Date(this.data.persona[0].fechaNacimiento),'yyyy-MM-dd')
          , [Validators.required])
      });
    }
  }
  guardar(){
    if(this.data.esNuevoRegistro){
      this.personasFisicasService.PostTbPersonasFisicas(this.registroUsuario.value).subscribe(res=>{
        console.log(res);
        this.snackBar.open("registro exitoso");
        this.personasFisicasService.invocarMetodoTraerContenido();
      });
    }else{
      let id = this.data.persona[0].idPersonaFisica;
      this.personasFisicasService.PutTbPersonasFisicas(id,this.registroUsuario.value).subscribe(res=>{
        this.snackBar.open("actualización exitosa");
        this.personasFisicasService.invocarMetodoTraerContenido();
      })
    }
  }
  validarConfirmacion(){
    if(this.registroUsuario.valid){
      this.guardar()
    }else{
      this.registroUsuario.markAllAsTouched();
      this.snackBar.open("error al ingresar los datos");
    }
  }
  salir(){
    this.dialogRevisionRef.close();
  }
}
