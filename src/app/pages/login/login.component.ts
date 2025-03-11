import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 form = new FormGroup({
    username: new FormControl('', [Validators.required,Validators.minLength(1)]),
    password: new FormControl('', [Validators.required,Validators.minLength(1)]),
  });

  clearForm() {
    this.form.reset();
  }

  constructor(private auth: AuthService, private router: Router) {

  }

  onSubmit()
  {
    if(this.form.valid){
      this.auth.login(this.form.value.username!, this.form.value.password!).subscribe({
        next: (data) => {
          this.auth.saveToken(data.token);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error("from login", err);
          alert("login failed"+(err.error?.error) || "check credentials")
        }
  
      }
      );
    }else{
      alert("please fill the credentials")
    }
  }
}
