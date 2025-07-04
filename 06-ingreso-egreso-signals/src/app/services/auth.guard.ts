import { inject, Injectable } from '@angular/core';
import { CanActivate, CanMatch, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanMatch {
  auth = inject(AuthService)
  router = inject(Router)

  canMatch(): boolean {
    if(!this.auth.isAuthSignal()){
      this.router.navigateByUrl('/login')
    }
    return this.auth.isAuthSignal()
  }
}
