import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartData } from 'chart.js';
import { IngresoEgreso } from '../../../models/ingreso-egreso.model';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { AppStateWithIngreso } from '../../../reducers/ingreso-egreso.reducer';

@Component({
  selector: 'app-estadistica',
  standalone: false,
  templateUrl: './estadistica.component.html',
  providers:[provideCharts(withDefaultRegisterables())],

})
export class EstadisticaComponent {
  ingresos: number = 0
  egresos: number = 0

  totalEgresos: number = 0
  totalIngresos: number = 0

  doughnutChartLabels: string[] = [
    'Ingreso',
    'Egreso',
  ];
  doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [] },
    ],
  };

  constructor(private store: Store<AppStateWithIngreso>){
    this.store.select(store => store.ingresosEgresos.items)
      .subscribe(items => this.generateStats(items))
  }

  generateStats(items: IngresoEgreso[]){
    items.forEach(item => {
      if(item.type === 'ingreso'){
        this.totalIngresos += item.quantity
        this.ingresos++
      } else {
        this.totalEgresos += item.quantity
        this.egresos++
      }
    })

    this.doughnutChartData.datasets[0].data = [this.totalIngresos, this.totalEgresos]
  }
}
