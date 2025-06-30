import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { deleteTodo, edit, toggle } from '../../actions/todo.actions';

@Component({
  selector: 'app-todo-item',
  standalone: false,
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent implements OnInit{
  @Input({required: true}) todo!: Todo;

  @ViewChild('inputFisico')
  txtInputFisico!: ElementRef;

  checkControl!: FormControl;
  txtInput!: FormControl;

  editando: boolean = false

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.checkControl = new FormControl(this.todo.completado)
    this.txtInput = new FormControl(this.todo.texto, Validators.required)

    this.checkControl.valueChanges.subscribe(value => 
      this.store.dispatch(toggle({id: this.todo.id}))
    )
  }

  editar() {
    this.editando = true

    setTimeout(() => 
      this.txtInputFisico.nativeElement.select(), 1)
  }
  
  terminarEdicion() {
    this.editando = false

    this.store.dispatch(edit({id: this.todo.id, text: this.txtInput.value}))
  }

  eliminar() {
    this.store.dispatch(deleteTodo({id: this.todo.id}))
  }
}
