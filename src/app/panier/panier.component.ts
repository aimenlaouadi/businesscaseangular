import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from '../shared/servicebusinesscase/localstorage/localstorage.service';
import { Item } from '../typescript/entites';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  items: Item[] = [];

  constructor(private localstorageService: LocalstorageService, private router: Router) {}

  ngOnInit(): void {
    this.items = this.localstorageService.getItems();
  }

  // Méthode pour calculer le total
  calculateTotal(): number {
    return this.items.reduce((total, item) => total + item.price * item.quantite, 0);
  }

  // Méthode pour vider le panier
  clearCart(): void {
    this.localstorageService.clearItems();
    this.items = [];
  }


  validateOrder(): void {
    
   this.router.navigate(['/payment']);
  }
}
