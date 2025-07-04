import { Injectable } from '@angular/core';
import { Movement } from '../models/movement.model';
import { GetMovementsResponse } from '../models/dto/get-movements.response';
import { Result } from '../models/result.model';
import { DeleteMovementResponse } from '../models/dto/delete-movement.response';

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

  deleteItem(uid: string): DeleteMovementResponse{
    const movements = localStorage.getItem(this.movementsKey)
    
    if(movements === null) {
      return {
        deletedMovement: null,
        success: false,
        message: 'Cannot find movements'
      }
    }

    const ieList: Movement[] = JSON.parse(movements)

    const movement = ieList.filter(ie => ie.uid === uid)

    if(movement.length === 0){
      return {
        deletedMovement: null,
        success: false,
        message: 'Movement not found'
      }
    }

    const newIeList = ieList.filter(ie => ie.uid !== uid)
    
    localStorage.setItem(this.movementsKey, JSON.stringify(newIeList))  
    
    return {
      deletedMovement: movement[0],
      success: true,
      message: 'Movement deleted successfully'
    }
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
