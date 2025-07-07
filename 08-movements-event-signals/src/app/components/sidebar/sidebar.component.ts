import { Component, effect, inject, signal, WritableSignal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { UserStore } from '../../stores/user.store';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  userStore = inject(UserStore)
  router = inject(Router)

  user = this.userStore.user
  error = this.userStore.error
  isLoggingOut: WritableSignal<boolean> = signal<boolean>(false)

  constructor(){
    effect(() => {
      if(this.isLoggingOut() && this.error()){
        Swal.fire({
          title: 'Oops...',
          text: this.error(),
          icon: 'error'
        })
        this.isLoggingOut.set(false)
      }
    })
    effect(() => {
      if(this.isLoggingOut() && this.user() === null){
        Swal.fire({
          title: 'Ok',
          text: 'User logged out successfully',
          icon: 'success'
        })
        this.isLoggingOut.set(false)

        this.router.navigateByUrl('/login')
      }
    })
  }

  async logout(){
    this.isLoggingOut.set(true)
    await this.userStore.logout()
  }
}
