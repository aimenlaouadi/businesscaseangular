import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, Service } from '../../../typescript/entites'; // Assurez-vous que ce chemin est correct

interface HydraCollection<T> {
  'hydra:member': T[];
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8000/api'; // URL de votre API

  constructor(private http: HttpClient) {}

  getServices(): Observable<HydraCollection<Service>> {
    return this.http.get<HydraCollection<Service>>(`${this.apiUrl}/services`);
  }
  getProducts(): Observable<HydraCollection<Product>> {
    return this.http.get<HydraCollection<Product>>(`${this.apiUrl}/products`);
}
getProductByUri(uri: string): Observable<Product> {
  return this.http.get<Product>("http://localhost:8000"+uri);
}
}
