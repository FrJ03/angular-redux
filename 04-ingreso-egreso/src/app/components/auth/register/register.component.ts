import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent{
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    })
  }

  registerUser(){
    if(this.registerForm.invalid){return}

    const newUser = new User(
      this.registerForm.value.nombre,
      this.registerForm.value.correo,
      this.registerForm.value.password
    )

    if(this.auth.createUser(newUser)){
      this.router.navigateByUrl('/')
    }
  }
}
