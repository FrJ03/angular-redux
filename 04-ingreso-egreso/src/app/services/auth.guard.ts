import { Injectable } from '@angular/core';
import { CanActivate, CanMatch, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanMatch {
  constructor(
    private auth: AuthService,
    private router: Router
  ){}

  canMatch(): Observable<boolean> {
    return this.auth.isAuth$.pipe(
      tap(state => {
        if(!state){
          this.router.navigateByUrl('/login')
        }
      }),
      take(1)
    )
  }

  canActivate(): Observable<boolean> {
    return this.auth.isAuth$.pipe(
      tap(state => {
        if(!state){
          this.router.navigateByUrl('/login')
        }
      })
    )
  }
}
