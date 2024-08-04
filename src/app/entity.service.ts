import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiListResponse } from './typescript/api';
import { environment } from './shared/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EntityService<T> {

  constructor(
   protected http: HttpClient,
   @Inject('baseUri') protected entityBaseUri: string 
  ) {}

  fetchAll(): Observable<ApiListResponse<T>> {
    return this.http.get<ApiListResponse<T>>(
      `${environment.apiBaseUrl}${this.entityBaseUri}`
    );
  }

fetch(id: number): Observable<T> {
  return this.http.get<T>(
    `${environment.apiBaseUrl}${this.entityBaseUri}/${id}`
  );
}

}
