import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from '../../typescript/entites';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BusinescasserviceService {
  private apiUrl = 'http://127.0.0.1:8000/api/services';

  constructor(private http: HttpClient) { }

  fetchAllServices(): Observable<Service[]> {
    return this.http.get<any>(this.apiUrl);
  
  }
}
