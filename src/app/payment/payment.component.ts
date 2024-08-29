import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocalstorageService } from '../shared/servicebusinesscase/localstorage/localstorage.service';
import { Item } from '../typescript/entites';
import { Router } from '@angular/router';
import { OrderService } from '../shared/servicebusinesscase/order/order.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf, NgClass],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  items: Item[] = [];
  totalAmount: number = 0;
  paymentForm!: FormGroup;
  paymentSuccess: boolean = false;

  constructor(
    private fb: FormBuilder,
    private localstorageService: LocalstorageService,
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    // Récupération des articles du localStorage
    this.items = this.localstorageService.getItems();
    this.totalAmount = this.calculateTotal();

    // Initialisation du formulaire réactif
    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      cardHolder: ['', [Validators.required]],
      expirationDate: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\/([0-9]{4})$')]],
      cvc: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]]
    });
  }

  // Calculer le total du panier
  calculateTotal(): number {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  // Validation du paiement et enregistrement des items puis des commandes
  async validatePayment(): Promise<void> {
    if (this.paymentForm.valid) {
      console.log('Paiement validé avec succès', this.paymentForm.value);

      try {
        // Enregistrer les items avant de créer la commande
        await this.saveOrderItems();
        // Créer la commande après l'enregistrement des items
        this.createOrder();
      } catch (error) {
        console.error('Erreur lors de l\'enregistrement des items', error);
      }
    } else {
      console.log('Formulaire de paiement non valide');
      this.paymentForm.markAllAsTouched(); // Marquer tous les champs comme touchés pour afficher les erreurs
    }
  }

  // Enregistrement des items de la commande avec async/await
  private async saveOrderItems(): Promise<void> {
    const itemPromises = this.items.map(item => {
      const itemData: Item = {
        price: item.price,
        quantity: item.quantity,
        product: item.product // Envoyer l'objet complet du produit
      };

      return this.orderService.createItem(itemData).toPromise();
    });

    try {
      // Attendre que tous les items soient enregistrés
      await Promise.all(itemPromises);
      console.log('Tous les items ont été enregistrés avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement des items', error);
      throw error; // Propager l'erreur pour être capturée dans `validatePayment`
    }
  }

  // Créer la commande après enregistrement des items
  private createOrder(): void {
    const orderData = {
      user_id: 1, 
      list_selection: this.items.map(item => item.product.id),
      date: new Date().toISOString() 
    };

    // Enregistrer la commande via le service
    this.orderService.createOrder(orderData).subscribe({
      next: (orderResponse) => {
        console.log('Commande créée avec succès', orderResponse);

        // Vider le panier après enregistrement des données
        this.localstorageService.clearItems();
        this.paymentSuccess = true; // Afficher la modal de succès
      },
      error: (error) => {
        console.error('Erreur lors de la création de la commande', error);
      }
    });
  }

  // Retourner à la page de commande
  returnToOrder(): void {
    this.router.navigate(['/panier']);
  }

  // Fermer la modal de succès
  closeModal(): void {
    this.paymentSuccess = false;
  }
}
