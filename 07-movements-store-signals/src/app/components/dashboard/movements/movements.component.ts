import { Component, effect, inject, signal, Signal, WritableSignal } from '@angular/core';
import { MovementsType } from '../../../models/value-objects/movements.type';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../models/user.model';
import { CommonModule } from '@angular/common';
import { Movement } from '../../../models/movement.model';
import Swal from 'sweetalert2';
import { MovementsStore } from '../../../stores/movements.store';
import { UserStore } from '../../../stores/user.store';

@Component({
  selector: 'app-movements',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './movements.component.html'
})
export class MovementsComponent {
  private movementsStore = inject(MovementsStore)
  private userStore = inject(UserStore)

  form: FormGroup = new FormGroup({
    description: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
  })
  type: MovementsType = 'deposit'
  user: Signal<User | null> = this.userStore.user
  loading: Signal<boolean> = this.movementsStore.loading
  error = this.movementsStore.error
  movements: Signal<Movement[]> = this.movementsStore.movements
  isAddProcessing: WritableSignal<boolean> = signal<boolean>(false)

  constructor(){
    effect(() => {
      if(this.error()){
        Swal.fire('Error', 'No se ha podido completar la operación', 'error')
        this.isAddProcessing.set(false)
      }
    })
    effect(() => {
      if(this.isAddProcessing() && this.movements()){
        Swal.fire('Creado', 'Elemento creado', 'success')
        this.isAddProcessing.set(false)
      }
    })
  }  

  toggleType(){
    if(this.type === 'deposit'){
      this.type = 'withdraw'
    } else {
      this.type = 'deposit'
    }
  }

  save(){
    const currentUser = this.user()
    if(this.form.invalid || !currentUser) {
      Swal.fire('Error', 'Faltan datos para registrar la operación', 'error')
      return
    }

    const movement = new Movement(
      this.form.value.description,
      this.form.value.quantity,
      this.type,
      currentUser.email
    )

    this.movementsStore.createMovement(movement)
    this.isAddProcessing.set(true)
  }
}
