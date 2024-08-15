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

  getUser(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${id}`);
  }

  updateUser(id: number, user: User): Observable<any> {
    console.log('ID de l\'utilisateur à mettre à jour :', id);
    console.log('Données de l\'utilisateur à mettre à jour :', user);
  
    return this.http.put(`${this.apiUrl}/users/${id}`, user).pipe(
      tap((response) => {
        console.log('Réponse de la mise à jour :', response);
      }),
      catchError((error) => {
        console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
        throw error;
      })
    );
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }
}
