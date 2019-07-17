import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      
      if(localStorage.getItem("currentUser") === null){
        this.router.navigate(['login'])
        return false
      } else {
        const isLoggedIn = this.authService.isLoggedIn()
        if(isLoggedIn){
          return true
        } else {
          this.router.navigate(['login'])
          return false
        }
      }

  }//

}//
