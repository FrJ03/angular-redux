import { Component, effect, inject, Signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { signalState } from '@ngrx/signals'
import { AppState } from '../../reducers/app.reducer';
import { Store } from '@ngrx/store';
import { User } from '../../models/user.model';
import { saveUser } from '../../actions/user.actions';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html'
})
export class RegisterComponent{
  private store = inject(Store)
  private router = inject(Router)

  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  loading: Signal<boolean> = this.store.selectSignal(state => state.user.loading)
  error = this.store.selectSignal(state => state.user.error)
  user: Signal<User | null> = this.store.selectSignal(state => state.user.user)

  constructor() {
    effect(() => {
      if(this.error()){
        Swal.fire({
          title: 'Oops...',
          text: 'User already exists',
          icon: 'error'
        })
      }
    })
    effect(() => {
      if(this.user()){
        Swal.fire({
          title: 'Ok',
          text: 'User registered successfully',
          icon: 'success'
        })

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

    this.store.dispatch(saveUser({user: newUser}))
  }
}
