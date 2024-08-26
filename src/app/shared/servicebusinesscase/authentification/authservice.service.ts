import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../../../typescript/entites';

export interface IToken {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://localhost:8000/api';
  private currentUser: User | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { username: string; password: string }): Observable<IToken> {
    return this.http.post<IToken>(`${this.url}/login_check`, credentials);
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  isLogged(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['connexion']);
  }

  fetchCurrentUser(): Observable<User> {
    const token = this.getToken();
    if (!token) {
      return new Observable(observer => {
        observer.error('Token not found');
        observer.complete();
      });
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<User>(`${this.url}/users/`, { headers });
  }

  setCurrentUser(user: User): void {
    this.currentUser = user;
  }

  getCurrentUser(user: User): User | null {
    return this.currentUser;
  }
}
