import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../../reducers/app.reducer';
import { isLoading, stopLoading } from '../../../actions/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnDestroy{
  loginForm: FormGroup
  loading: boolean = false
  uiSubscription: Subscription

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private store: Store<AppState>
  ){
    this.loginForm = fb.group({
      correo: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    })

    this.uiSubscription = this.store.select(state => state.ui).subscribe(ui => {
      this.loading = ui.isLoading
    })
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe()
  }

  login(){
    this.store.dispatch(isLoading())
    
    // Swal.fire({
    //   title: 'Waiting...',
    //   didOpen: () => {
    //     Swal.showLoading()
    //   }
    // })

    if(this.loginForm.valid && this.auth.loginUser(
      this.loginForm.value.correo,
      this.loginForm.value.password
    )){
      // Swal.close()
      this.store.dispatch(stopLoading())
      this.router.navigateByUrl('/')
    } else {
      this.store.dispatch(stopLoading())
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Email or password is not correct',
      })
    }
  }
}
