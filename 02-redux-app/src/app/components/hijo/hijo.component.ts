import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { State, Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { divide, product } from '../../actions/contador.actions';

@Component({
  selector: 'app-hijo',
  standalone: false,
  templateUrl: './hijo.component.html'
})
export class HijoComponent implements OnInit {
  contador: number = 0;

  constructor(private store: Store<AppState>){}

  ngOnInit(): void {
    this.store.subscribe(state => this.contador = state.count)
  }

  multiplicar(){
    this.store.dispatch(product({numero: 2}))
  }

  dividir(){
    this.store.dispatch(divide({numero: 2}))
  }
}
