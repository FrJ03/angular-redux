import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { Filter, setFilter } from '../../../actions/filter.actions';

@Component({
  selector: 'app-todo-footer',
  standalone: false,
  templateUrl: './todo-footer.component.html',
  styleUrl: './todo-footer.component.css'
})
export class TodoFooterComponent implements OnInit {
  currentFilter: Filter = 'todos'
  filters: Filter[] = ['todos', 'completados', 'activos']
  pendientes: number = 0

  constructor(private store: Store<AppState>){}

  ngOnInit(): void {
    this.store.subscribe(state => {
      this.currentFilter = state.filter
      this.pendientes = state.todos
        .filter(todo => !todo.completado)
        .length
    })
  }

  updateFilter(filter: Filter){
    this.store.dispatch(setFilter({filter: filter}))
  }
}
