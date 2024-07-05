import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../typescript/entites';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BusinescasproductService {
  private apiUrl = 'http://127.0.0.1:8000/api/products';

  constructor(private http: HttpClient) { }

  fetchAllProducts(): Observable<Product[]> {
    return this.http.get<any>(this.apiUrl);
  }
}


