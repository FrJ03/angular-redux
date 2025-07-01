import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../reducers/app.reducer';
import { IngresoEgreso } from '../../../models/ingreso-egreso.model';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../../../services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  imports: [CommonModule],
  templateUrl: './detalle.component.html'
})
export class DetalleComponent implements OnDestroy{
  ingresosEgresos: IngresoEgreso[] = []
  ingresosEgresosSubscription: Subscription

  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ){
    this.ingresosEgresosSubscription = this.store.select(store => store.ingresosEgresos.items)
      .subscribe(items => this.ingresosEgresos = items)
  }

  ngOnDestroy(): void {
    this.ingresosEgresosSubscription.unsubscribe()
  }

  deleteItem(item: IngresoEgreso){
    if(item.uid && this.ingresoEgresoService.deleteItem(item.uid)){
      Swal.fire('Borrado', 'Elemento borrado', 'success')
    } else {
      Swal.fire('Error', 'No se ha podido borrar el elemento', 'error')
    }
  }
}
