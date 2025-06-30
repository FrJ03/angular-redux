import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  createUser(user: User): boolean{
    const users = localStorage.getItem('users')

    if(users === null){
      localStorage.setItem('users', JSON.stringify([user]))
      localStorage.setItem('currentUser', JSON.stringify(user))
      return true
    } else {
      const userList: User[] = JSON.parse(users)

      if(userList.filter(u => 
        u.email === user.email 
        || u.username === user.username
      ).length === 0){
        localStorage.setItem('users', JSON.stringify([...userList, user]))
        localStorage.setItem('currentUser', JSON.stringify(user))
        
        return true
      }

      return false
    }
  }

  loginUser(email: string, password: string): boolean{
    const users = localStorage.getItem('users')

    if(users === null) {return false}

    const userList: User[] = JSON.parse(users)

    const user = userList.filter(u => u.email === email && u.password === password)

    if(user.length === 0) {return false}

    localStorage.setItem('currentUser', JSON.stringify(user[0]))

    return true
  }
}
