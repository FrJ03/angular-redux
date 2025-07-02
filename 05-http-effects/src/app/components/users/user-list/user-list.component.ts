import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../reducers/app.reducers';
import { loadUsers } from '../../../actions/users.actions';

@Component({
  selector: 'app-user-list',
  imports: [],
  templateUrl: './user-list.component.html'
})
export class UserListComponent {
  users: User[] = []
  loading: boolean = false
  error: any = null

  store$ = inject(Store<AppState>)

  constructor(){ 
    this.store$.select(store => store.users).subscribe(store => {
      this.users = store.users
      this.loading = store.loading
      this.error = store.error
    })

    this.store$.dispatch(loadUsers())
  }
}
