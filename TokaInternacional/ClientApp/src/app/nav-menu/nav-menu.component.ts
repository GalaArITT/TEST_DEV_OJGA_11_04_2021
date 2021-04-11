import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  isLogout=false; 
  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null){
      this.isLogout=true;
    }else{
      this.isLogout=false
    }
    if(this.loginService.invocarRefreshLoginSubscription == undefined){
      this.loginService.invocarRefreshLoginSubscription = this.loginService.invocarRefreshLogin.subscribe(()=>{
        this.ngOnInit();
      })
    }
  }
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  CerrarSesion(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
