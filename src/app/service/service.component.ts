import { Component, OnInit } from '@angular/core';
import { OrderService } from '../shared/servicebusinesscase/order/order.service';
import { Item, Service } from '../typescript/entites'; // Assurez-vous que ces modèles sont correctement définis
import { NgClass, NgFor, NgIf } from '@angular/common';

interface HydraCollection<T> {
  'hydra:member': T[];
}

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [NgClass, NgFor, NgIf],
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
  services: Service[] = []; // Liste de tous les services
  selectedServices: Service[] = []; // Liste des services sélectionnés
  activeAccordionIndex: number | null = null; // Index de l'accordéon actif

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadServices(); // Charger les services au démarrage du composant
  }

  // Méthode pour charger les services depuis l'API
  loadServices(): void {
    this.orderService.getServices().subscribe({
      next: (data: HydraCollection<Service>) => {
        this.services = data['hydra:member'] || []; // Assurez-vous que 'services' est toujours un tableau
        console.log('Données des services :', this.services); // Vérifiez la structure ici
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des services', error);
      }
    });
  }

  // Méthode pour sélectionner un service
  selectService(service: Service): void {
    const existingService = this.selectedServices.find(s => s.id === service.id);
    if (!existingService) {
      // Initialiser les propriétés critiques pour éviter les erreurs lors de l'accès
      this.selectedServices.push({
        ...service,
        serviceProducts: service.serviceProducts || [] // Assurez-vous que 'serviceProducts' est toujours un tableau
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

  // Calcul du total général basé sur les quantités des items
  getTotal(): number {
    return this.selectedServices.reduce((total, service) => {
      // Vérifiez que serviceProducts est un tableau avant de l'utiliser
      if (Array.isArray(service.serviceProducts)) {
        return total + service.serviceProducts.reduce((serviceTotal, serviceProduct) => {
          // Vérifiez que items est un tableau avant de l'utiliser
          if (Array.isArray(serviceProduct.items)) {
            return serviceTotal + serviceProduct.items.reduce((itemTotal, item) => {
              return itemTotal + (item.quantite * item.price);
            }, 0);
          }
          return serviceTotal;
        }, 0);
      }
      return total;
    }, 0);
  }
}
