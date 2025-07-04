import { Component, effect, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers/app.reducer';
import { Router, RouterLink } from '@angular/router';
import { logoutUser } from '../../actions/user.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  store = inject(Store<AppState>)
  router = inject(Router)

  user = this.store.selectSignal(store => store.user.user)
  error = this.store.selectSignal(store => store.user.error)

  constructor(){
    effect(() => {
      if(this.error()){
        Swal.fire({
          title: 'Oops...',
          text: this.error(),
          icon: 'error'
        })
      }
    })
    effect(() => {
      if(this.user()){
        Swal.fire({
          title: 'Ok',
          text: 'User logged out successfully',
          icon: 'success'
        })

        this.router.navigateByUrl('/login')
      }
    })
  }

  logout(){
    this.store.dispatch(logoutUser())
  }
}
