import { Component, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../reducers/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
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
    this.storeSubscription = this.store.select(store => store.user.user).subscribe(user => {
      if(user){
        this.username = user.username
      }
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
