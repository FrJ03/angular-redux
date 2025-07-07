import { Component, effect, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers/app.reducer';
import { Router, RouterLink } from '@angular/router';
import { logoutUser } from '../../actions/user.actions';
import Swal from 'sweetalert2';
import { selectError, selectUser } from '../../selectors/user.selectors';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  store = inject(Store<AppState>)
  router = inject(Router)

  user = this.store.selectSignal(selectUser)
  error = this.store.selectSignal(selectError)

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
      if(this.user() === null){
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
