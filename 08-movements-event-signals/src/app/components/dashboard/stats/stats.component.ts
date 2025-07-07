import { CommonModule } from '@angular/common';
import { Component, effect, inject, Signal } from '@angular/core';
import { Movement } from '../../../models/movement.model';
import {BaseChartDirective} from 'ng2-charts'
import { ChartData } from 'chart.js';
import { MovementsStore } from '../../../stores/movements.store';

@Component({
  selector: 'app-stats',
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './stats.component.html'
})
export class StatsComponent {
  private movementsStore = inject(MovementsStore)

  movements: Signal<Movement[]> = this.movementsStore.movements
  
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

  constructor(){
    effect(() => {
      if(this.movements()){
        this.generateStats(this.movements())
      }
    })
  }

  generateStats(items: Movement[]){
    items.forEach(item => {
      if(item.type === 'deposit'){
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
