import { inject, Injectable } from '@angular/core';
import { CanMatch, CanMatchFn, Route, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authCanMatch: CanMatchFn = (route: Route) => {
  const authService = inject(AuthService)
  const router = inject(Router)

  const result = authService.checkLogged()

  if(
    route.path 
    && ['login', 'register'].includes(route.path)
  ){
    if(result.logged){
      router.navigateByUrl('')
    }
    return !result.logged
  } else {
    if(!result.logged){
      router.navigateByUrl('login')
    }
    return result.logged
  }
}