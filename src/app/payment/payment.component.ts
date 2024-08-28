import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocalstorageService } from '../shared/servicebusinesscase/localstorage/localstorage.service';
import { Item } from '../typescript/entites';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  items: Item[] = [];
  totalAmount: number = 0;
  paymentForm!: FormGroup;
  paymentSuccess: boolean = false; // Pour gérer l'affichage de la modal

  constructor(
    private fb: FormBuilder,
    private localstorageService: LocalstorageService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.items = this.localstorageService.getItems();
    this.totalAmount = this.calculateTotal();

    // Initialiser le formulaire réactif
    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      cardHolder: ['', [Validators.required]],
      expirationDate: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\/([0-9]{4})$')]], // Format MM/YY
      cvc: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]]
    });
  }

  calculateTotal(): number {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  validatePayment(): void {
    if (this.paymentForm.valid) {
      console.log('Paiement validé avec succès', this.paymentForm.value);

      // Simuler la validation de paiement et vider le panier
      this.localstorageService.clearItems();

      // Déclencher l'affichage de la modal
      this.paymentSuccess = true;
    } else {
      console.log('Formulaire de paiement non valide');
      this.paymentForm.markAllAsTouched();
    }
  }

  returnorder() {
    this.router.navigate(['/panier']);
  }

  // Méthode pour fermer la modal de succès
  closeModal(): void {
    this.paymentSuccess = false;
  }
}
