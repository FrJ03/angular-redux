import { Injectable } from '@angular/core';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {
  private ingresoEgresoKey = 'ies'

  constructor() { }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso){
    const ingresosEgresos = localStorage.getItem(this.ingresoEgresoKey)

    if(ingresosEgresos === null){
      localStorage.setItem(this.ingresoEgresoKey, JSON.stringify([ingresoEgreso]))
    } else {
      const ieList: IngresoEgreso[] = JSON.parse(ingresosEgresos)
      localStorage.setItem(this.ingresoEgresoKey, JSON.stringify([...ieList, ingresoEgreso]))
    }
  }
}
