import { Router }  from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})

export class GuardAuthService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {
  }

  // if user is logged in, allow for navigate to route
  canActivate() {
    if (this.auth.auth.currentUser) return true;
    else {this.router.navigate(['']); return false};
  }

}


