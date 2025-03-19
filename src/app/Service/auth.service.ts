
// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  private userSubject = new BehaviorSubject<any>(this.getUser());
  user$ = this.userSubject.asObservable();

  constructor(http: HttpClient) {
    super(http);
    this.apiUrl += 'User'; // Example: https://your-api-base-url/auth
    
  }

  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    return this.post<any>('loginuser', loginData).pipe(
      tap((response: { token: string; user: any; }) => {
        if (response?.token && response?.user) {
          this.storeUserData(response.token, response.user);
        }
      })
    );
  }

  // User Registration
  register(formData: FormData): Observable<any> {
    return this.postForm<any>('UserRegister', formData).pipe(
      tap((response: { token: string; user: any; }) => {
        if (response?.token && response?.user) {
          this.storeUserData(response.token, response.user);
        }
      })
    );
  }
  updateUser(formData: FormData): Observable<any> {
    return this.putForm<any>('update', formData).pipe(
      tap((response) => {
        // Update user data in localStorage
        const user = this.getUser();
        const updatedUser = { ...user, ...response.user };
        this.storeUserData(response.token || this.getToken()!, updatedUser);
      })
    );
  }
  
  changePassword(data: { 
    currentPassword: string; 
    newPassword: string 
  }): Observable<any> {
    return this.post<any>('change-password', data).pipe(
      tap((response) => {
        // Update user data in localStorage
        const user = this.getUser();
        const updatedUser = { ...user, ...response.user };
        this.storeUserData(response.token || this.getToken()!, updatedUser);
      })
    );
  }

  // Store token and user info in localStorage
  private storeUserData(token: string, user: any): void {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }

  // Get Token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Get Logged-in User
  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }


  // Check if User is Logged In
  isLoggedIn(): boolean {
    const token = this.getToken();
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.exp) {
      // Convert expiration time to milliseconds
      const expirationTime = payload.exp * 1000;
      return Date.now() < expirationTime;
    }
  } catch (e) {
    console.error('Error decoding token:', e);
  }
  return false;
  }

  // User Logout
logout(): boolean {
  // Clear both current user and temporary cart
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('temp_cart');
  this.userSubject.next(null);
  return true;
}

  // Set Authorization Header
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }
}

