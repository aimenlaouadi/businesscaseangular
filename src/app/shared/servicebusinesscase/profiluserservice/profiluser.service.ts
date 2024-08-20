import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { User } from '../../../typescript/entites';

@Injectable({
  providedIn: 'root'
})
export class ProfiluserService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${id}`, user).pipe(
      tap(response => console.log('Réponse de la mise à jour :', response)),
      catchError(error => {
        console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
        throw error;
      })
    );
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`);
  }
}
