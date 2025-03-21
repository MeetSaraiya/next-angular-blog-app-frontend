import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  // authenticated = false;
  constructor(private authService:AuthService,private router:Router){

  }
  get authenticated(){
    return this.authService.isAuthenticated()
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  gotoReg(){
    this.router.navigate(['/register']);
  }
  gotoLogin(){
    this.router.navigate(['/login']);
  }
}
