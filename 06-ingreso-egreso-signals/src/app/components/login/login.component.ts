import { Component, effect, inject, Signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { logUser } from '../../actions/user.actions';
import Swal, {} from 'sweetalert2'
import { User } from '../../models/user.model';
import { selectError, selectLoading, selectUser } from '../../selectors/user.selector';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html'
})
export class LoginComponent{
  private store = inject(Store)
  private router = inject(Router)

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  loading: Signal<boolean> = this.store.selectSignal(selectLoading)
  error = this.store.selectSignal(selectError)
  user: Signal<User | null> = this.store.selectSignal(selectUser)

  constructor(){
    effect(() => {
      if(this.error()){
        Swal.fire({
          title: 'Oops...',
          text: 'User not found',
          icon: 'error'
        })
      }
    })
    effect(() => {
      if(this.user()){
        Swal.fire({
          title: 'Ok',
          text: 'User logged successfully',
          icon: 'success'
        })

        this.router.navigateByUrl('')
      }
    })
  }

  login(){
    this.store.dispatch(logUser({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }))
  }
}
