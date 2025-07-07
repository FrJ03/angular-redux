import { Component, effect, inject, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { User } from './models/user.model';
import { MovementsStore } from './stores/movements.store';
import { UserStore } from './stores/user.store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private userStore = inject(UserStore)
  private movementsStore = inject(MovementsStore)

  user: Signal<User | null> = this.userStore.user
  
  constructor(){
    this.userStore.checkLogged()
    
    effect(() => {
      const email = this.user()?.email
      
      if(email !== undefined){
        this.movementsStore.loadMovements(email)
      }
    })
  }
}
