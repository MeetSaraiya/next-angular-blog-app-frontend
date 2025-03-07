import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  formG = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  clearForm() {
    this.formG.reset();
  }

  constructor(private auth: AuthService, private router: Router) {

  }

  onSubmit() {
    this.auth.register(this.formG.value.username || "empty", this.formG.value.password || "empty").subscribe({
      next: (data) => { if (data) { alert("user registered"), this.router.navigateByUrl("/login") } },
      error: (error) => console.error("from Register", error)
    }
    );
  }

}
