import { Component, inject } from '@angular/core';
import { UserStore } from '../../stores/user.store';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  private userStore = inject(UserStore)

  user = this.userStore.user
}
