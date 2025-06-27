import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoAddComponent } from './components/todo-add/todo-add.component';
import { TodoFooterComponent } from './components/todo-footer/todo-footer.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoPageComponent } from './components/todo-page/todo-page.component';



@NgModule({
  declarations: [
    TodoAddComponent,
    TodoFooterComponent,
    TodoItemComponent,
    TodoListComponent,
    TodoPageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TodoPageComponent
  ]
})
export class TodoModule { }
