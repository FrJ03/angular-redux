import { Component, effect, inject, signal, Signal, WritableSignal } from '@angular/core';
import { Movement } from '../../../models/movement.model';
import { CommonModule } from '@angular/common';
import { MovementsService } from '../../../services/movements.service';
import Swal from 'sweetalert2';
import { MovementsStore } from '../../../stores/movements.store';

@Component({
  selector: 'app-details',
  imports: [CommonModule],
  templateUrl: './details.component.html'
})
export class DetailsComponent {
  movementsService = inject(MovementsService)
  private movementsStore = inject(MovementsStore)

  movements: Signal<Movement[]> = this.movementsStore.movements
  error = this.movementsStore.error
  isDelProcessing: WritableSignal<boolean> = signal<boolean>(false)
  loading = this.movementsStore.loading

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
    effect(() => {
      if(this.movements()){
        console.log(this.movements())
      }
    })
  }

  deleteItem(item: Movement){
    if(!item.uid){
      Swal.fire('Error', 'No se ha podido borrar el elemento', 'error')
      return
    }
    
    this.isDelProcessing.set(true)
    this.movementsStore.deleteMovement(item.uid)
  }
}
