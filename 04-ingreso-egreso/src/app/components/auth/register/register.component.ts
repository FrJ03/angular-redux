import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../../reducers/app.reducer';
import { Subscription } from 'rxjs';
import { isLoading, stopLoading } from '../../../actions/ui.actions';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnDestroy{
  registerForm: FormGroup;
  uiSubscription: Subscription
  loading: boolean = false

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    })

    this.uiSubscription = this.store.select(state => state.ui).subscribe(ui => 
      this.loading = ui.isLoading
    )
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe()
  }

  registerUser(){
    this.store.dispatch(isLoading())
    // Swal.fire({
    //   title: 'Waiting...',
    //   didOpen: () => {
    //     Swal.showLoading()
    //   }
    // })

    if(this.registerForm.invalid){return}

    const newUser = new User(
      this.registerForm.value.nombre,
      this.registerForm.value.correo,
      this.registerForm.value.password
    )

    if(this.auth.createUser(newUser)){
      // Swal.close()
      this.store.dispatch(stopLoading())
      this.router.navigateByUrl('/')
    } else {
      this.store.dispatch(stopLoading())
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'User already exists',
      })
    }
  }
}
