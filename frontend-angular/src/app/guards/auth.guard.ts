import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    // Check if the user is logged in using the method from AuthService
    if (this.authService.isLoggedIn()) {
      // If logged in, allow access to the route
      return true;
    } else {
      // If not logged in, redirect to the login page
      console.log('AuthGuard: User not logged in, redirecting to /login');
      // Create a UrlTree to redirect the user
      return this.router.createUrlTree(['/login']);
    }
  }
}