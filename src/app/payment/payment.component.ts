import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalstorageService } from '../shared/servicebusinesscase/localstorage/localstorage.service';
import { Item } from '../typescript/entites';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule, NgIf],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  items: Item[] = [];
  totalAmount: number = 0;

  // Le formulaire de paiement
  paymentForm!: FormGroup;

  constructor(
    private fb: FormBuilder,  // Injecter FormBuilder
    private localstorageService: LocalstorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.items = this.localstorageService.getItems();
    this.totalAmount = this.calculateTotal();

    // Initialiser le formulaire réactif
    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      cardHolder: ['', [Validators.required]],
      expirationDate: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\/([0-9]{2})$')]], // Format MM/YY
      cvc: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]]
    });
  }

  // Calculer le total des articles dans le panier
  calculateTotal(): number {
    return this.items.reduce((total, item) => total + item.price * item.quantite, 0);
  }

  // Méthode pour valider le paiement
  validatePayment(): void {
    if (this.paymentForm.valid) {
      console.log('Paiement validé avec succès', this.paymentForm.value);
      
      this.localstorageService.clearItems(); // Vider le panier après paiement
      this.router.navigate(['/confirmation']); // Rediriger vers une page de confirmation (à configurer)
    } else {
      console.log('Formulaire de paiement non valide');
    }
  }
}
