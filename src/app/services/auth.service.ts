import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Post } from './post.service';

export interface AuthResponse{
  token:string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL = "http://localhost:3000/api";
  token : any = ""

  constructor(private http: HttpClient,private router:Router) { }

  register(username: string, password: string) {
    console.log(username,password)
    return this.http.post(`${this.apiURL}/auth/register`,{username,password});
  }

  

  logout() {
    this.token = null;
    localStorage.removeItem("jwt");
    this.router.navigate(["/login"]);
   }

  login(username: string, password: string) {
    console.log("login")
    return this.http.post<AuthResponse>(`${this.apiURL}/auth/login`,{username,password});
  }

  saveToken(token:string)
  {
   this.token = token;
   localStorage.setItem("jwt",token);
  }

  loadToken(){
    const tkn = localStorage.getItem("jwt");
    if(tkn){
      this.token = tkn;
    }
    return this.token;
  }

  isAuthenticated() {
    return !!this.loadToken();
    // return false;
  }

}

