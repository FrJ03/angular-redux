import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { Filter } from '../../../actions/filter.actions';

@Component({
  selector: 'app-todo-list',
  standalone: false,
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit{
  todos: Todo[] = []
  currentFilter: Filter = 'todos'

  constructor(private store: Store<AppState>){}

  ngOnInit(): void {
    this.store.subscribe(state => {
      this.todos = state.todos
      this.currentFilter = state.filter
    })
  }
}
