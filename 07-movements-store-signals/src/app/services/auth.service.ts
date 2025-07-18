import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Result } from '../models/result.model';
import { GetUserResponse } from '../models/dto/get-user.response';
import { CheckUserResponse } from '../models/dto/check-user.response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  async createUser(user: User): Promise<Result>{
    const users = localStorage.getItem('users')
    await new Promise(resolve => setTimeout(resolve, 1000))

    if(users === null){
      localStorage.setItem('users', JSON.stringify([user]))
      localStorage.setItem('currentUser', JSON.stringify(user))
      
      return {
        success: true,
        message: "success"
      }
    } else {
      const userList: User[] = JSON.parse(users)

      if(userList.filter(u => 
        u.email === user.email 
        || u.username === user.username
      ).length === 0){
        localStorage.setItem('users', JSON.stringify([...userList, user]))
        localStorage.setItem('currentUser', JSON.stringify(user))
        
        return {
          success: true,
          message: "success"
        }
      } else {
        return {
          success: false,
          message: "User already exists"
        }
      }
      
    }
  }

  async loginUser(email: string, password: string): Promise<Partial<GetUserResponse>>{
    const users = localStorage.getItem('users')

    await new Promise(resolve => setTimeout(resolve, 1000))

    if(users === null) {
      return {
        result: {
          success: false,
          message: 'User not exists'
        }
      }
    }

    const userList: User[] = JSON.parse(users)

    const user = userList.filter(u => u.email === email && u.password === password)

    if(user.length === 0) {
      return {
        result: {
          success: false,
          message: 'User not exists'
        }
      }
    }

    localStorage.setItem('currentUser', JSON.stringify(user[0]))

    return {
      user: user[0],
      result: {
        success: true,
        message: 'success'
      }
    }
  }

  async logout(): Promise<Result>{
    localStorage.removeItem('currentUser')

    await new Promise(resolve => setTimeout(resolve, 1000))

    return {
      success: true,
      message: 'User logged out successfully'
    }
  }

  async checkLogged(): Promise<CheckUserResponse>{
    const userStr = localStorage.getItem('currentUser')

    await new Promise(resolve => setTimeout(resolve, 1000))

    if(!userStr) {
      return {
        logged: false,
        user: null,
        message: 'User not authenticated',
        success: true
      }
    } else {
      const user: User = JSON.parse(userStr)

      return {
        logged: true,
        user: user,
        message: 'User authenticated',
        success: true
      }
    }
  }
}
