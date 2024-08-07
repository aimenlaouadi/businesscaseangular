import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../module/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}
  
   register(user:IUser): Observable<any> {
    return this.http.post(`${this.url}/users`, user);
  }

  checkUsernameAvailability(username: string): Observable<boolean> {
    return this.http.get<boolean>(`/api/check-username?username=${username}`);
  }
  
}

