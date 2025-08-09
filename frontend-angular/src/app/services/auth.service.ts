import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private httpOptions = {
    withCredentials: true
  };
  private apiUrl = `${environment.apiUrl}/auth`;
  private tokenKey = `${environment.tokenKey}`;

  constructor(private http: HttpClient, private router: Router) { }
  // New login method for form-based authentication
  // New login method for form-based authentication
  login(credentials: { username: string, password: string }): Observable<any> {
    interface LoginCredentials {
      username: string;
      password: string;
    }

    interface LoginResponse {
      accessToken: string;
    }

    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials as LoginCredentials).pipe(
      tap((response: LoginResponse) => {
        if (response && response.accessToken) {
          this.saveToken(response.accessToken);
        }
      })
    );
  }
  
    /**
   * Checks if a user is currently logged in by verifying the token's existence.
   * @returns true if a token exists, false otherwise.
   */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

 isAdmin(): boolean {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        console.log('Decoded Token:', decodedToken);
        // FIX: Check for 'ROLE_Admin' to match the new authority name in the JWT.
        // Note: The role name is case-sensitive.
        return decodedToken.auth && decodedToken.auth.includes('ROLE_ADMIN');
      } catch (error) {
        console.error('Error decoding token:', error);
        return false;
      }
    }
    return false;
  }

  // These methods redirect the user to the backend's OAuth2 login endpoints.
  // The backend then handles the authentication with the provider.
  loginWithGoogle() {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  }

  loginWithGitHub() {
    window.location.href = 'http://localhost:8080/oauth2/authorization/github';
  }

  loginWithFacebook() {
    // Note: Facebook login requires additional setup on the Facebook Developer portal.
    window.location.href = 'http://localhost:8080/oauth2/authorization/facebook';
  }

  // --- New methods for token management ---
  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
  // Logout is now a simple frontend operation
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

}
