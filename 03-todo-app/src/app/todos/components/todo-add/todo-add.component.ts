import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { create } from '../../actions/todo.actions';

@Component({
  selector: 'app-todo-add',
  standalone: false,
  templateUrl: './todo-add.component.html',
  styleUrl: './todo-add.component.css'
})
export class TodoAddComponent implements OnInit {
  txtInput: FormControl

  constructor(private store: Store<AppState>){
    this.txtInput = new FormControl('Hola', Validators.required)
  }

  ngOnInit(): void {
    
  }

  add(){
    if(this.txtInput.invalid){
      return
    }
    this.store.dispatch(create({ texto: this.txtInput.value }))
    this.txtInput.reset()
  }
}
