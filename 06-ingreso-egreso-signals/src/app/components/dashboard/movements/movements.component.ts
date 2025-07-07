import { Component, effect, inject, signal, Signal, WritableSignal } from '@angular/core';
import { MovementsType } from '../../../models/value-objects/movements.type';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../reducers/app.reducer';
import { User } from '../../../models/user.model';
import { CommonModule } from '@angular/common';
import { addMovement } from '../../../actions/movements.actions';
import { Movement } from '../../../models/movement.model';
import Swal from 'sweetalert2';
import { selectUser } from '../../../selectors/user.selector';

@Component({
  selector: 'app-movements',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './movements.component.html'
})
export class MovementsComponent {
  store = inject(Store<AppState>)

  form: FormGroup = new FormGroup({
    description: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
  })
  type: MovementsType = 'deposit'
  user: Signal<User | null> = this.store.selectSignal(selectUser)
  loading: Signal<boolean> = this.store.selectSignal(store => store.movements.loading)
  error = this.store.selectSignal(store => store.movements.error)
  movements: Signal<Movement[]> = this.store.selectSignal(store => store.movements.movements)
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

    this.store.dispatch(addMovement({movement}))
    this.isAddProcessing.set(true)
    /*
    this.store.dispatch(isLoading())

    if(this.ingresoForm.invalid || this.currentEmail === '') {
      this.store.dispatch(stopLoading())
      Swal.fire('Error', 'No se ha podido completar la operación', 'error')
      return
    }

    const newIngresoEgreso = new IngresoEgreso(
      this.ingresoForm.value.descripcion,
      this.ingresoForm.value.cantidad,
      this.type,
      this.currentEmail
    )

    this.ingresoEgresoService.crearIngresoEgreso(newIngresoEgreso)

    this.store.dispatch(stopLoading())

    Swal.fire('Creado', 'Elemento creado', 'success')*/
  }
}
