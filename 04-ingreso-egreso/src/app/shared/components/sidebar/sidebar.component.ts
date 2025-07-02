import { Component, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../reducers/app.reducer';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnDestroy{
  username: string = ''
  storeSubscription: Subscription

  constructor(
    private auth: AuthService,
    private router: Router,
    private store: Store<AppState>
  ){
    this.storeSubscription = this.store
      .select(store => store.user.user)
      .pipe(
        filter(user => user !== null)
      )
      .subscribe(user => {
          this.username = user.username
      })
  }

  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe()
  }

  logout(){
    this.auth.logout()
    this.router.navigateByUrl('/login')
  }
}
