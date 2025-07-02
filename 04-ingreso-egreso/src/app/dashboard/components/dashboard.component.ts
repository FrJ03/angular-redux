import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers/app.reducer';
import { filter, Subscription } from 'rxjs';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import { setItems } from '../../actions/ingreso-egreso.actions';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnDestroy{
  private storeSubscription: Subscription
  private currentIESubscription: Subscription | null = null

  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ){
    this.storeSubscription = this.store
      .select(store => store.user.user)
      .pipe(
        filter(user => user !== null)
      )
      .subscribe(user => {
        this.currentIESubscription = 
          this.ingresoEgresoService.initIngresosEgresosListener(user.email)
            .subscribe(current => {
              this.store.dispatch(setItems({items: current}))
              console.log(current)
            })
      })
  }

  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe()
    this.currentIESubscription?.unsubscribe()
  }
}
