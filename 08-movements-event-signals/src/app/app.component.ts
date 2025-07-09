import { Component, effect, inject, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { User } from './models/user.model';
import { MovementsStore } from './stores/movements.store';
import { UserStore } from './stores/user.store';
import { Dispatcher } from '@ngrx/signals/events';
import { checkLogged } from './events/user.events';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private userStore = inject(UserStore)
  private readonly dispatcher = inject(Dispatcher)
  private movementsStore = inject(MovementsStore)

  user: Signal<User | null> = this.userStore.user
  
  constructor(){
    this.dispatcher.dispatch(checkLogged.init())
    
    effect(() => {
      const email = this.user()?.email
      
      if(email !== undefined){
        this.movementsStore.loadMovements(email)
      }
    })
  }
}
