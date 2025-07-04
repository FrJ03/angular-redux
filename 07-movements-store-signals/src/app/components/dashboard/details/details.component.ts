import { Component, effect, inject, signal, Signal, WritableSignal } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../reducers/app.reducer';
import { Movement } from '../../../models/movement.model';
import { CommonModule } from '@angular/common';
import { MovementsService } from '../../../services/movements.service';
import Swal from 'sweetalert2';
import { deleteMovement } from '../../../actions/movements.actions';
import { WritableStateSource } from '@ngrx/signals';

@Component({
  selector: 'app-details',
  imports: [CommonModule],
  templateUrl: './details.component.html'
})
export class DetailsComponent {
  store = inject(Store<AppState>)
  movementsService = inject(MovementsService)

  movements: Signal<Movement[]> = this.store.selectSignal(store => store.movements.movements)
  error = this.store.selectSignal(store => store.movements.error)
  isDelProcessing: WritableSignal<boolean> = signal<boolean>(false)
  loading = this.store.selectSignal(store => store.movements.loading)

  constructor(){
    effect(() => {
      if(this.error()){
        Swal.fire('Error', 'No se ha podido borrar el elemento', 'error')
        this.isDelProcessing.set(false)
      }
    })
    effect(() => {
      if(this.isDelProcessing() && !this.loading()){
        Swal.fire('Borrado', 'Elemento borrado', 'success')
        this.isDelProcessing.set(false)
      }
    })
  }

  deleteItem(item: Movement){
    if(!item.uid){
      Swal.fire('Error', 'No se ha podido borrar el elemento', 'error')
      return
    }
    
    this.isDelProcessing.set(true)
    this.store.dispatch(deleteMovement({uid: item.uid}))
    /*if(item.uid && this.movementsService.deleteItem(item.uid)){
      Swal.fire('Borrado', 'Elemento borrado', 'success')
    } else {
      Swal.fire('Error', 'No se ha podido borrar el elemento', 'error')
    }*/
  }
}
