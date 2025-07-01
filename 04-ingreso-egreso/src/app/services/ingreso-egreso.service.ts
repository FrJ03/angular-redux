import { Injectable } from '@angular/core';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {
  private ingresoEgresoKey = 'ies'
  private currentIngresosEgresos = new BehaviorSubject<IngresoEgreso[]>([])

  constructor() { }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso){
    const ingresosEgresos = localStorage.getItem(this.ingresoEgresoKey)

    if(ingresosEgresos === null){
      localStorage.setItem(this.ingresoEgresoKey, JSON.stringify([ingresoEgreso]))
    } else {
      const ieList: IngresoEgreso[] = JSON.parse(ingresosEgresos)
      localStorage.setItem(this.ingresoEgresoKey, JSON.stringify([...ieList, ingresoEgreso]))
    }

    if(ingresoEgreso.email !== undefined){
      this.currentIngresosEgresos.next(this.getIngresoEgreso(ingresoEgreso.email))
    }

  }

  deleteItem(uid: string){
    const ingresosEgresos = localStorage.getItem(this.ingresoEgresoKey)
    
    if(ingresosEgresos === null) {return false}

    const ieList: IngresoEgreso[] = JSON.parse(ingresosEgresos)

    const newIeList = ieList.filter(ie => ie.uid !== uid)
    
    localStorage.setItem(this.ingresoEgresoKey, JSON.stringify(newIeList))
    this.currentIngresosEgresos.next(newIeList)    
    
    return true
  }

  private getIngresoEgreso(email: string): IngresoEgreso[]{
    const ingresosEgresos = localStorage.getItem(this.ingresoEgresoKey)
    
    if(ingresosEgresos === null) {return []}

    const ieList: IngresoEgreso[] = JSON.parse(ingresosEgresos)

    return ieList.filter(ie => ie.email === email)
  }

  initIngresosEgresosListener(email: string) {
    this.currentIngresosEgresos.next(this.getIngresoEgreso(email))
    return this.currentIngresosEgresos.asObservable()
  }
}
