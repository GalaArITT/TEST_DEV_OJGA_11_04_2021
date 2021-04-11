import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  //objeto de TS para simular el modelo de la api
  formModel ={ //En este caso puse los nombres igual a los de la API
    NombreUsuario:'',
    password:''
  }
  constructor(private loginService: LoginService, 
    private router:Router, private toastr:ToastrService){

  }
  ngOnInit(){
    this.loginService.invocarMetodoRefreshLogin();
    if (localStorage.getItem('token') != null){
      //console.log(localStorage.getItem('token'));
      this.router.navigateByUrl('/modulos');//si el token aun existe que me rediriga a esta pagina
    }
  }
  onSubmit(form: NgForm){
    this.loginService.iniciarSesion(form.value).subscribe(
      (res: any) => {
        console.log(res);
        localStorage.setItem('token', res.token); //setear en storage el token
        this.router.navigateByUrl('/modulos'); //redirigir a la pagina 
      },
      err => {
        if (err.status == 400){
          this.toastr.error('Incorrect username or password.', 'Authentication failed.');
        }
        else
          console.log(err);
      }
    );  
  }
}
