import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-modulos',
  templateUrl: './modulos.component.html',
  styleUrls: ['./modulos.component.css']
})
export class ModulosComponent implements OnInit {
  userDetails; 
  constructor(private router: Router, private loginService: LoginService) { }
  ngOnInit() {
    this.loginService.getUserProfile().subscribe(res=>{
      this.userDetails = res; 
      console.log(res);
    });
  }

}
