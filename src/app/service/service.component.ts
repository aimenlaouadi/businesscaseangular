import { Component, OnInit } from '@angular/core';
import { OrderService } from '../shared/servicebusinesscase/order/order.service';
import { Service, Product, Item } from '../typescript/entites';
import { NgClass, NgFor, NgIf } from '@angular/common';

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

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.orderService.getServices().subscribe(data => {
      this.services = data['hydra:member'] || [];
    });
  }

  selectService(service: Service): void {
    const existingService = this.selectedServices.find(s => s.id === service.id);
    if (!existingService) {
      this.selectedServices.push(service);
      this.productsMap[service.id] = []; // Initialiser la liste des produits pour ce service

      // Charger les produits associés à ce service
      service.products.forEach((productUri) => {
        this.orderService.getProductByUri(productUri).subscribe((product) => {
          this.productsMap[service.id].push(product); // Ajouter le produit à la map
          this.items.push({
            id: product.id,
            price: product.price, // Assurez-vous que Product a une propriété price
            quantite: 1,
            product: product // Ajout du produit dans l'item
          });
        });
      });
    }
  }

  // Méthode pour gérer l'ouverture/fermeture des éléments de l'accordéon
  toggleAccordion(index: number): void {
    this.activeAccordionIndex = this.activeAccordionIndex === index ? null : index;
  }

  // Méthode pour augmenter la quantité d'un item
  increaseItemQuantity(item: Item): void {
    item.quantite++;
  }

  // Méthode pour diminuer la quantité d'un item
  decreaseItemQuantity(item: Item): void {
    if (item.quantite > 1) {
      item.quantite--;
    }
  }

  // (Optionnel) Méthode pour calculer le total général basé sur les quantités des items
  calculateTotal(): number {
    return this.items.reduce((total, item) => total + item.price * item.quantite, 0);
  }

  // (Optionnel) Méthode pour ajouter la commande au panier
  addToCart(): void {
    // Implémentez la logique pour ajouter les services sélectionnés et les items au panier
  }
}
