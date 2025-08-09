import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
    roles: string[] = environment.roles;
  // 1. Declare the loginError property
  loginError: string | null = null;
  passwordVisible = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Initialize the form with controls and validators
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: [this.roles[0], Validators.required] // Default to the first role
    });
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }

  loginWithGitHub() {
    this.authService.loginWithGitHub();
  }

  loginWithFacebook() {
    this.authService.loginWithFacebook();
  }

   ngOnInit(): void {
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
  onSubmit(): void {
   this.loginError = null;
    if (this.loginForm.invalid) {
      return; // Don't submit if the form is invalid
    }

    const { username, password } = this.loginForm.value;
    this.authService.login({ username, password }).subscribe({
      next: () => {
        // On successful login, navigate to the employees screen
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        // If login fails, display an error message
        this.loginError = 'Invalid username or password. Please try again.';
        console.error('Login failed:', err);
      }
    });
    // Example of how you would call the auth service:
    // const { username, password, role } = this.loginForm.value;
    // this.authService.login(username, password, role).subscribe(...);
  }
}