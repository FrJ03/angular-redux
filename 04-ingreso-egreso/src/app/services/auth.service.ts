import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { setUser, unsetUser } from '../actions/auth.actions';
import { unsetItems } from '../actions/ingreso-egreso.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserStorage = new BehaviorSubject<Record<string, any>>({})

  constructor(private store: Store) { }

  initAuthListener(){
    this.storageChanges$.subscribe(user => {
      if(
        user
        && Object.keys(user).includes('username')
        && Object.keys(user).includes('email')
        && Object.keys(user).includes('password')
      ){
        this.store.dispatch(setUser({user: new User(
          user['username'],
          user['email'],
          user['password']
        )}))
      } else {
        this.store.dispatch(unsetUser())
        this.store.dispatch(unsetItems())
      }
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
