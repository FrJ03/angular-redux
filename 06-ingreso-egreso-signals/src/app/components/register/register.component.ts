import { Component, inject, Signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { signalState } from '@ngrx/signals'
import { AppState } from '../../reducers/app.reducer';
import { Store } from '@ngrx/store';
import { User } from '../../models/user.model';
import { saveUser } from '../../actions/user.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
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

  registerUser(){

    if(this.registerForm.invalid){return}

    const newUser = new User(
      this.registerForm.value.email,
      this.registerForm.value.username,
      this.registerForm.value.password
    )

    this.store.dispatch(saveUser({user: newUser}))

    this.router.navigateByUrl('')
  }
}
