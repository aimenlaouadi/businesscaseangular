import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from '../../shared/servicebusinesscase/localstorage/localstorage.service';
import { Service, Product, Item } from '../../typescript/entites'; 
import { Router } from '@angular/router';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { OrderService } from '../../shared/servicebusinesscase/order/order.service';
import { CartSummaryComponent } from '../cart-summary/cart-summary.component';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [NgClass, NgFor, NgIf, CartSummaryComponent],
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
  services: Service[] = [];
  selectedServices: Service[] = [];
  activeAccordionIndex: number | null = null;
  productsMap: { [key: string]: Product[] } = {}; // Map pour stocker les produits par service

  constructor(
    private localstorageService: LocalstorageService, 
    private router: Router, 
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.loadServices();
  }

  // Charger tous les services
  loadServices(): void {
    this.orderService.getServices().subscribe(data => {
      this.services = data['hydra:member'] || [];
      console.log('Services récupérés :', this.services); 
    });
  }

  // Sélectionner un service et charger les produits associés
  selectService(service: Service): void {
    const existingService = this.selectedServices.find(s => Number(s.id) === service.id);
    if (!existingService) {
      this.selectedServices.push(service);
      this.productsMap[service.id] = []; 
      this.loadProductsForService(service.id); // Charger les produits associés au service
    }
  }

  // Charger les produits pour un service spécifique
  loadProductsForService(serviceId: number): void {
    const service = this.services.find(s => s.id === serviceId);
  
    if (service && service.products) {
      // Initialiser le tableau pour stocker les produits associés
      this.productsMap[serviceId] = [];
  
      // Parcourir les URLs des produits et les récupérer un par un
      service.products.forEach((productUrl: string) => {
        this.orderService.getProductByUri(productUrl).subscribe(product => {
          this.productsMap[serviceId].push(product);
        }, error => {
          console.error('Erreur lors de la récupération du produit :', error);
        });
      });
    } else {
      console.error('Service non trouvé ou aucun produit associé');
    }
  }
  
  
  

  // Ajouter un produit au panier
  addToCart(product: Product): void {
    let cart = this.localstorageService.getItems(); // Récupérer les produits existants dans le panier
  
    // Vérifier si l'item existe déjà dans le panier
    const existingItem = cart.find(item => item.product.id === product.id);
  
    if (existingItem) {
      // Si l'item existe déjà, augmenter simplement la quantité
      existingItem.quantity += product.quantity || 1;
    } else {
      // Sinon, créer un nouvel Item avec le produit
      const newItem: Item = {
        product: product,
        quantity: product.quantity || 1, // S'assurer que la quantité est prise en compte
        price: product.price,
      
      };
      cart.push(newItem);
    }
  
    // Sauvegarder le panier mis à jour dans le localStorage
    this.localstorageService.saveItems(cart);
  }
  

  // Augmenter la quantité d'un produit
  increaseProductQuantity(product: Product): void {
    product.quantity = (product.quantity || 1) +1;
  }

  // Diminuer la quantité d'un produit
  decreaseProductQuantity(product: Product): void {
    if (product.quantity && product.quantity > 1) {
      product.quantity--;
    }
  }

  // Gérer l'affichage de l'accordéon
  toggleAccordion(index: number): void {
    this.activeAccordionIndex = this.activeAccordionIndex === index ? null : index;
  }


  addAllToCartAndGoToCart(): void {
    // Parcourir tous les services sélectionnés
    this.selectedServices.forEach(service => {
      // Vérifier si le service a des produits associés
      if (this.productsMap[service.id]) {
        // Parcourir tous les produits associés à ce service
        this.productsMap[service.id].forEach(product => {
          // Ajouter le produit au panier
          this.addToCart(product);
        });
      }
    });

    // Après avoir ajouté tous les produits au panier, naviguer vers le panier
    this.goToCart();
  }



  goToCart(): void {
    this.router.navigate(['/panier']);
  }

}
