import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers/app.reducer';
import { selectUser } from '../../selectors/user.selector';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  private store = inject(Store<AppState>)

  user = this.store.selectSignal(selectUser)
}
