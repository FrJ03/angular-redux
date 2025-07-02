import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../reducers/app.reducers';
import { loadUser } from '../../../actions/user.actions';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.component.html'
})
export class UserComponent {
  router = inject(ActivatedRoute)
  store$ = inject(Store<AppState>)
  user: User | null = null
  loading: boolean = false
  error: any = null

  constructor(){
    this.store$.select(store => store.user).subscribe(user => {
      this.user = user.user
      this.loading = user.loading
      this.error = user.error
    })
    this.router.params.subscribe(({id}) => {
      this.store$.dispatch(loadUser({id}))
    })
  }
}
