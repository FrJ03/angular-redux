import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers/app.reducer';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs';
import { isLoading, stopLoading } from '../../actions/ui.actions';
import Swal from 'sweetalert2';
import { AppStateWithIngreso } from '../../reducers/ingreso-egreso.reducer';

@Component({
  selector: 'app-ingreso-egreso',
  standalone: false,
  templateUrl: './ingreso-egreso.component.html'
})
export class IngresoEgresoComponent implements OnDestroy {
  ingresoForm: FormGroup
  type: 'ingreso' | 'egreso' = 'ingreso'
  currentEmail: string = ''
  storeSubscription: Subscription
  loading: boolean = false

  constructor(
    private fb: FormBuilder,
    private store: Store<AppStateWithIngreso>,
    private ingresoEgresoService: IngresoEgresoService
  ){
    this.ingresoForm = fb.group({
      descripcion: ['', Validators.required],
      cantidad: ['', Validators.required]
    })

    this.storeSubscription = this.store.subscribe(store => {
      if(store.user.user){
        this.currentEmail = store.user.user.email
      } else {
        this.currentEmail = ''
      }

      this.loading = store.ui.isLoading
    })
  }

  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe()
  }

  toggleType(){
    if(this.type === 'ingreso'){
      this.type = 'egreso'
    } else {
      this.type = 'ingreso'
    }
  }

  save(){
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

    Swal.fire('Creado', 'Elemento creado', 'success')
  }
}
