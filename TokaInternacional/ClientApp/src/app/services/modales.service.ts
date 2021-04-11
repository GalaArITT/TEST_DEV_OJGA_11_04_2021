import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

import { NgDialogAnimationService } from "ng-dialog-animation";

@Injectable({
  providedIn: 'root'
})
export class ModalesService {

  constructor(public dialog: NgDialogAnimationService,
    public dialogMat: MatDialog) { }

  
  public abrirDialogoLateral(componente: any, datos?: any) {
    return this.dialog.open(componente, {
      data: datos,
      panelClass: "dialogo-lateral",
      position: {
        top: "0",
        right: "0",
        bottom: "0"
      },
      animation:{to:"left"},
      height: '100vh',
      maxHeight: '100vh',
      maxWidth: '800px',
      disableClose: true
    });
  }
  public openDialog(componente: any, datos?: any){
    return this.dialogMat.open(componente, {
      data: datos
    });
  }
}
