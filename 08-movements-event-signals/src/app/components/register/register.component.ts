import { Component, effect, inject, signal, Signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { UserStore } from '../../stores/user.store';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html'
})
export class RegisterComponent{
  private userStore = inject(UserStore)
  private router = inject(Router)

  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  loading: Signal<boolean> = this.userStore.loading
  error = this.userStore.error
  user: Signal<User | null> = this.userStore.user
  isSaving: WritableSignal<boolean> = signal<boolean>(false)

  constructor() {
    effect(() => {
      if(this.isSaving() && this.error()){
        Swal.fire({
          title: 'Oops...',
          text: 'User already exists',
          icon: 'error'
        })
      }
      this.isSaving.set(false)
    })
    effect(() => {
      if(this.user()){
        Swal.fire({
          title: 'Ok',
          text: 'User registered successfully',
          icon: 'success'
        })
        this.isSaving.set(false)

        this.router.navigateByUrl('')
      }
    })
  }

  registerUser(){

    if(this.registerForm.invalid){return}

    const newUser = new User(
      this.registerForm.value.email,
      this.registerForm.value.username,
      this.registerForm.value.password
    )
    
    this.isSaving.set(true)
    this.userStore.saveUser(newUser)
  }
}
