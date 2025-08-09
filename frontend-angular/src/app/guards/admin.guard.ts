import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAdmin()) {
      return true; // Allow access if user is admin
    } else {
      // If not admin, redirect to the main employees page
      this.router.navigate(['/employees']);
      return false;
    }
  }
}
