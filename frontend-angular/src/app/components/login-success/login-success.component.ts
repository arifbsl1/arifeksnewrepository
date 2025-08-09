import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-success',
  template: '<p>Please wait, logging you in...</p>',
})
export class LoginSuccessComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // Subscribe to the query parameters in the URL
    this.route.queryParams.subscribe(params => {
      const token = params['token'];

      console.log('Received token LoginSuccessComponent:', token);

      if (token) {
        // If a token is found, save it
        console.log('Received token from backend1:', token);
        this.authService.saveToken(token);
        // Redirect to the main employee dashboard
        this.router.navigate(['/employees']);
      } else {
        // If no token is found, redirect back to the login page
        this.router.navigate(['/login']);
      }
    });
  }
}