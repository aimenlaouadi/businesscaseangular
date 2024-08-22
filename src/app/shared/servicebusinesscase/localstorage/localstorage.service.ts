import { Injectable } from '@angular/core';
import { Item } from '../../../typescript/entites'; 

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  private storageKey = 'cartItems';  

  constructor() { }

 
  getItems(): Item[] {
    const items = localStorage.getItem(this.storageKey);
    return items ? JSON.parse(items) : [];
  }

  // Sauvegarder les items dans le Local Storage
  saveItems(items: Item[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  // Ajouter un item au Local Storage
  addItem(item: Item): void {
    const items = this.getItems();
    items.push(item);
    this.saveItems(items);
  }

  // Supprimer un item du Local Storage
  removeItem(itemId: number): void {
    let items = this.getItems();
    items = items.filter(item => item.id !== itemId);
    this.saveItems(items);
  }

  // Vider le panier (supprimer tous les items)
  clearItems(): void {
    localStorage.removeItem(this.storageKey);
  }
}
