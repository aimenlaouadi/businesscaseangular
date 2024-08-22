import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from '../shared/servicebusinesscase/localstorage/localstorage.service';
import { Service, Product, Item } from '../typescript/entites';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { OrderService } from '../shared/servicebusinesscase/order/order.service';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [NgFor, NgIf, NgClass],
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
  services: Service[] = [];
  selectedServices: Service[] = [];
  items: Item[] = [];
  activeAccordionIndex: number | null = null;
  productsMap: { [key: string]: Product[] } = {}; // Map pour stocker les produits par service

  constructor(private localstorageService: LocalstorageService, private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadServices();
    // Charger les items du Local Storage dans la liste locale
    this.items = this.localstorageService.getItems();
  }

  loadServices(): void {
    this.orderService.getServices().subscribe(data => {
      this.services = data['hydra:member'] || [];
      console.log('Services récupérés :', this.services); // Ajoutez ceci pour vérifier les données
    });
  }

  selectService(service: Service): void {
    const existingService = this.selectedServices.find(s => s.id === service.id);
    if (!existingService) {
      this.selectedServices.push(service);
      this.productsMap[service.id] = []; // Initialiser la liste des produits pour ce service

      // Simuler la récupération des produits associés à ce service
      service.products.forEach((productUri) => {
        this.orderService.getProductByUri(productUri).subscribe((product) => {
          this.productsMap[service.id].push(product); // Ajouter le produit à la map
        });
      });
    }
  }

  // Méthode pour ajouter un produit au panier
  addToCart(product: Product): void {
    // Vérifier si le produit existe déjà dans le panier
    const existingItem = this.items.find(item => item.product.id === product.id);
  
    if (existingItem) {
      // Si le produit existe déjà, augmenter simplement sa quantité
      existingItem.quantite++;
    } else {
      // Sinon, créer un nouvel item et l'ajouter au panier
      const selectedItem: Item = {
        id: Date.now(),  // Génération d'un ID unique basé sur le timestamp actuel
        price: product.price,  // Utiliser le prix du produit
        quantite: 1,  // Quantité par défaut lors de l'ajout au panier
        product: product
      };
  
      // Ajouter l'item au Local Storage via le service
      this.localstorageService.addItem(selectedItem);
  
      // Ajouter l'élément à la liste locale d'items
      this.items.push(selectedItem);
    }
  
    // Mettre à jour le Local Storage après l'ajout ou la modification
    this.localstorageService.saveItems(this.items);
  }
  

  // Méthode pour supprimer un produit du panier
  removeFromCart(item: Item): void {
    if (item.id !== undefined) {  // Vérifiez que l'ID n'est pas `undefined`
      this.localstorageService.removeItem(item.id);  // Supprimer l'item du Local Storage
      this.items = this.items.filter(i => i.id !== item.id);  // Supprimer l'item de la liste locale
    } else {
      console.error('Impossible de supprimer l\'élément car l\'ID est indéfini');
    }
  }

  // Méthode pour gérer l'ouverture/fermeture des éléments de l'accordéon
  toggleAccordion(index: number): void {
    this.activeAccordionIndex = this.activeAccordionIndex === index ? null : index;
  }

  // Méthode pour augmenter la quantité d'un item
  increaseItemQuantity(item: Item): void {
    item.quantite++;
    this.localstorageService.saveItems(this.items);  // Mettre à jour le Local Storage
  }

  // Méthode pour diminuer la quantité d'un item
  decreaseItemQuantity(item: Item): void {
    if (item.quantite > 1) {
      item.quantite--;
      this.localstorageService.saveItems(this.items);  // Mettre à jour le Local Storage
    }
  }

  // Calcul du total général basé sur les quantités des items
  calculateTotal(): number {
    return this.items.reduce((total, item) => total + item.price * item.quantite, 0);
  }

  // Vider le panier
  clearCart(): void {
    this.localstorageService.clearItems();
    this.items = [];
  }
}
