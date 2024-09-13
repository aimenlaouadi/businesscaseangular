import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocalstorageService } from '../shared/servicebusinesscase/localstorage/localstorage.service';
import { Item, NewItem, Order } from '../typescript/entites';
import { Router } from '@angular/router';
import { OrderService } from '../shared/servicebusinesscase/order/order.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';
import { JwtService } from '../shared/servicebusinesscase/jwt/jwt.service';

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
    private orderService: OrderService,
    private jwt: JwtService,
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
    console.log(this.jwt.getDecodeToken().user_id);
  }

  // Calculer le total du panier
  calculateTotal(): number {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

    // Méthode pour valider le paiement
    validatePayment() {
      if (this.paymentForm.valid) {
        // Si le formulaire est valide, afficher la modal de succès
        this.paymentSuccess = true;
      } else {
        // Si le formulaire est invalide, marquer tous les champs comme touchés pour afficher les erreurs
        this.paymentForm.markAllAsTouched();
      }
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
