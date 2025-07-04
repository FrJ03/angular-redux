import { Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';
import { Result } from '../models/result.model';
import { GetUserResponse } from '../models/dto/get-user.response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public readonly registrationSignal = signal<Result | null>(null)
  public readonly getUserSignal = signal<Partial<GetUserResponse> | null>(null)

  createUser(user: User){
    const users = localStorage.getItem('users')

    if(users === null){
      localStorage.setItem('users', JSON.stringify([user]))
      localStorage.setItem('currentUser', JSON.stringify(user))

      this.registrationSignal.set({
        success: true,
        message: "success"
      })
    } else {
      const userList: User[] = JSON.parse(users)

      if(userList.filter(u => 
        u.email === user.email 
        || u.username === user.username
      ).length === 0){
        localStorage.setItem('users', JSON.stringify([...userList, user]))
        localStorage.setItem('currentUser', JSON.stringify(user))
        
        this.registrationSignal.set({
          success: true,
          message: "success"
        })
      } else {
        this.registrationSignal.set({
          success: false,
          message: "User already exists"
        })
      }
      
    }
  }

  loginUser(email: string, password: string){
    const users = localStorage.getItem('users')

    if(users === null) {
      this.getUserSignal.set({
        result: {
          success: false,
          message: 'User not exists'
        }
      })
      
      return
    }

    const userList: User[] = JSON.parse(users)

    const user = userList.filter(u => u.email === email && u.password === password)

    if(user.length === 0) {
      this.getUserSignal.set({
        result: {
          success: false,
          message: 'User not exists 2'
        }
      })

      return
    }

    localStorage.setItem('currentUser', JSON.stringify(user[0]))

    this.getUserSignal.set({
      user: user[0],
      result: {
        success: true,
        message: 'success'
      }
    })
  }
}
