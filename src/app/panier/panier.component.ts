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

  // Méthode pour augmenter la quantité d'un item
  increaseItemQuantity(item: Item): void {
    item.quantity++;
    
    this.localstorageService.saveItems(this.items);  // Sauvegarder les items mis à jour dans le localStorage
  }

  // Méthode pour diminuer la quantité d'un item
  decreaseItemQuantity(item: Item): void {
    if (item.quantity > 0) {
      item.quantity--;
      this.localstorageService.saveItems(this.items);  // Sauvegarder les items mis à jour dans le localStorage
    }
  }

  // Méthode pour calculer le total
  calculateTotal(): number {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  // Méthode pour vider le panier
  clearCart(): void {
    this.localstorageService.clearItems();
    this.items = [];
  }

  // Méthode pour valider la commande
  validateOrder(): void {
    // Vérifie s'il y a des articles avec une quantité supérieure à 0
    const hasItemsInCart = this.items.some(item => item.quantity > 0);
    
    if (hasItemsInCart) {
      // Redirige vers la page de paiement si la condition est remplie
      this.router.navigate(['/payment']);
    } else {
      // Sinon, affiche un message d'erreur ou empêche l'accès
      alert('Votre panier est vide ou contient uniquement des articles avec une quantité de zéro.');
    }
  }
  

  removeItem(item: any): void {
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
    }
  }
  

}
