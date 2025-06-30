import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../models/todo.model';
import { Filter } from '../../actions/filter.actions';

@Pipe({
  name: 'filterTodo',
  standalone: false
})
export class FilterPipe implements PipeTransform {

  transform(todos: Todo[], filter: Filter): Todo[] {
    switch(filter){
      case 'completados':
        return todos.filter(todo => todo.completado)

      case 'activos':
        return todos.filter(todo => !todo.completado)

      default:
        return todos
    }
  }

}
