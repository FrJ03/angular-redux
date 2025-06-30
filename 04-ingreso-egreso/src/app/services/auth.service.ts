import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserStorage = new BehaviorSubject<Record<string, any>>({})

  constructor() { }

  initAuthListener(){
    this.storageChanges$.subscribe(user => {
      console.log(user)
    })
  }

  createUser(user: User): boolean{
    const users = localStorage.getItem('users')

    if(users === null){
      localStorage.setItem('users', JSON.stringify([user]))
      localStorage.setItem('currentUser', JSON.stringify(user))

      this.currentUserStorage.next({user})

      return true
    } else {
      const userList: User[] = JSON.parse(users)

      if(userList.filter(u => 
        u.email === user.email 
        || u.username === user.username
      ).length === 0){
        localStorage.setItem('users', JSON.stringify([...userList, user]))
        localStorage.setItem('currentUser', JSON.stringify(user))
        this.currentUserStorage.next({user})
        
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
    this.currentUserStorage.next(user[0])

    return true
  }

  logout(){
    localStorage.removeItem('currentUser')
    this.currentUserStorage.next({})
  }

  get storageChanges$(){
    return this.currentUserStorage.asObservable()
  }

  get isAuth$(){
    return this.storageChanges$.pipe(
      map(user => Object.keys(user).length > 0)
    )
  }
}
