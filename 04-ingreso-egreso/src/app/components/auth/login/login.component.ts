import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ){
    this.loginForm = fb.group({
      correo: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    })
  }

  login(){
    Swal.fire({
      title: 'Waiting...',
      didOpen: () => {
        Swal.showLoading()
      }
    })

    if(this.loginForm.valid && this.auth.loginUser(
      this.loginForm.value.correo,
      this.loginForm.value.password
    )){
      Swal.close()
      this.router.navigateByUrl('/')
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Email or password is not correct',
      })
    }
  }
}
