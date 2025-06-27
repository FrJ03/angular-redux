import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { decrement, increment } from './actions/contador.actions';

interface AppState {
  count: number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  contador: number = 0

  constructor (private store: Store<AppState>) {
    this.store.subscribe(state => this.contador = state.count)
  }

  incrementar(){
    this.store.dispatch(increment())
  }

  decrementar(){
    this.store.dispatch(decrement())
  }
}
