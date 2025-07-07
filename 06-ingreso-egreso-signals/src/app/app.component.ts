import { Component, effect, inject, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './reducers/app.reducer';
import { checkLogged } from './actions/user.actions';
import { User } from './models/user.model';
import { getMovements } from './actions/movements.actions';
import { selectUser } from './selectors/user.selector';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  store = inject(Store<AppState>)
  user: Signal<User | null> = this.store.selectSignal(selectUser)
  
  constructor(){
    this.store.dispatch(checkLogged())
    
    effect(() => {
      const email = this.user()?.email
      if(email !== undefined){
        this.store.dispatch(getMovements({email}))
      }
    })
  }
}
