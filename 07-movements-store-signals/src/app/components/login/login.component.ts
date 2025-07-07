import { Component, effect, inject, signal, Signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router, RouterLink } from '@angular/router';
import Swal, {} from 'sweetalert2'
import { User } from '../../models/user.model';
import { UserStore } from '../../stores/user.store';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html'
})
export class LoginComponent{
  private userStore = inject(UserStore)
  private router = inject(Router)

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  loading: Signal<boolean> = this.userStore.loading
  error = this.userStore.error
  user: Signal<User | null> = this.userStore.user
  isLoggingUser: WritableSignal<boolean> = signal<boolean>(false)

  constructor(){
    effect(() => {
      if(this.isLoggingUser() && this.error()){
        Swal.fire({
          title: 'Oops...',
          text: 'User not found',
          icon: 'error'
        })
        this.isLoggingUser.set(false)
      }
    })
    effect(() => {
      if(this.user()){
        Swal.fire({
          title: 'Ok',
          text: 'User logged successfully',
          icon: 'success'
        })
        this.isLoggingUser.set(false)

        this.router.navigateByUrl('')
      }
    })
  }

  login(){
    this.isLoggingUser.set(true)
    
    this.userStore.logUser(
      this.loginForm.value.email,
      this.loginForm.value.password
    )
  }
}
