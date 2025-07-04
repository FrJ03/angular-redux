import { Injectable } from '@angular/core';
import { Movement } from '../models/movement.model';
import { GetMovementsResponse } from '../models/dto/get-movements.response';
import { Result } from '../models/result.model';

@Injectable({
  providedIn: 'root'
})
export class MovementsService {
  private movementsKey = 'ies'

  constructor() { }

  createMovement(movement: Movement): Result{
    const movements = localStorage.getItem(this.movementsKey)

    console.log(movements)

    if(movements === null){
      localStorage.setItem(this.movementsKey, JSON.stringify([movement]))
    } else {
      const ieList: Movement[] = JSON.parse(movements)

      console.log(ieList)
      localStorage.setItem(this.movementsKey, JSON.stringify([...ieList, movement]))
    }

    return {
      success: true,
      message: 'Movement added successfully'
    }
  }

  deleteItem(uid: string){
    const movements = localStorage.getItem(this.movementsKey)
    
    if(movements === null) {return false}

    const ieList: Movement[] = JSON.parse(movements)

    const newIeList = ieList.filter(ie => ie.uid !== uid)
    
    localStorage.setItem(this.movementsKey, JSON.stringify(newIeList))  
    
    return true
  }

  getMovementsByEmail(email: string): GetMovementsResponse{
    const movements = localStorage.getItem(this.movementsKey)
    
    if(movements === null) {
      return {
        movements: [],
        success: false,
        message: 'Movements storage not found'
      }
    }

    const ieList: Movement[] = JSON.parse(movements)

    return {
      movements: ieList.filter(ie => ie.email === email),
      success: true,
      message: 'Movements loaded successfully'
    }
  }
}
