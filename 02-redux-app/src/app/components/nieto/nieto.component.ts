import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { reset } from '../../actions/contador.actions';

@Component({
  selector: 'app-nieto',
  standalone: false,
  templateUrl: './nieto.component.html'
})
export class NietoComponent implements OnInit {
  contador: number = 10;
  
  constructor(private store: Store<AppState>){}

  ngOnInit(): void {
    this.store.subscribe(state => this.contador = state.count)
  }

  reset() {
    this.store.dispatch(reset())
  }
}
