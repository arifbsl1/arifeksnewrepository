import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Employee Management System';

  // Make AuthService public so the template can access it
  constructor(public authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}