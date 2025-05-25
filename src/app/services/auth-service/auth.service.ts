import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    // Dummy check for username and password
    if ((username === 'admin' && password === 'admin')) {
      this.isAuthenticated = true;
      localStorage.setItem('isAuthenticated', 'true');  // Store in localStorage
      return true;
    } else {
      this.isAuthenticated = false;
      localStorage.setItem('isAuthenticated', 'false');
      return false;
    }
  }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.setItem('isAuthenticated', 'false');
    this.router.navigate(['/auth/login']);
  }

  getAuthStatus(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true';
  }
}
