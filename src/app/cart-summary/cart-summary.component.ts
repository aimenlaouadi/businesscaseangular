import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { LocalstorageService } from '../shared/servicebusinesscase/localstorage/localstorage.service'; 
import { Item } from '../typescript/entites'; 
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {
  cartItems: Item[] = [];

  constructor(
    private localstorageService: LocalstorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCartItems(); // Charger les articles du panier lors de l'initialisation du composant
  }

  // Charger les articles du panier depuis le localStorage
  loadCartItems(): void {
    this.cartItems = this.localstorageService.getItems();
  }

  // Calculer le total du panier
  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  // Rediriger vers la page du panier
  goToCart(): void {
    this.router.navigate(['/panier']);
  }

  // Ajouter une quantité d'un article
  increaseQuantity(index: number): void {
    this.cartItems[index].quantity += 1;
    this.localstorageService.saveItems(this.cartItems); // Mettre à jour le localStorage
  }

  // Diminuer la quantité d'un article
  decreaseQuantity(index: number): void {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity -= 1;
      this.localstorageService.saveItems(this.cartItems); // Mettre à jour le localStorage
    }
  }

  // Supprimer un article du panier
  removeItem(index: number): void {
    this.cartItems.splice(index, 1);
    this.localstorageService.saveItems(this.cartItems); // Mettre à jour le localStorage
  }

  // Vider le panier
  clearCart(): void {
    this.cartItems = [];
    this.localstorageService.saveItems(this.cartItems); // Mettre à jour le localStorage
  }
}
