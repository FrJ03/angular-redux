import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { toggleAll } from '../../actions/todo.actions';

@Component({
  selector: 'app-todo-page',
  standalone: false,
  templateUrl: './todo-page.component.html',
  styleUrl: './todo-page.component.css'
})
export class TodoPageComponent {
  completado: boolean = false

  constructor(private store: Store<AppState>){}

  toggleAll() {
    this.completado = !this.completado

    this.store.dispatch(toggleAll({completado: this.completado}))
  }
}
