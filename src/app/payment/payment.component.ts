import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocalstorageService } from '../shared/servicebusinesscase/localstorage/localstorage.service';
import { Item, NewItem, Order } from '../typescript/entites';
import { Router } from '@angular/router';
import { OrderService } from '../shared/servicebusinesscase/order/order.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
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
      cvc: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]],
      depotDate: ['', Validators.required],
      paymentMethod: ['', Validators.required]

    });
    console.log(this.jwt.getDecodeToken().user_id);
  }

  // Calculer le total du panier
  calculateTotal(): number {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  validatePayment(): void {
    if (this.paymentForm.valid) {
      const userId = this.jwt.getDecodeToken().user_id;
      const order: Order = { 
      user: `/api/users/${userId}`,
      date: new Date().toISOString(),
      depotDate: this.paymentForm.value.depotDate,
      paymentMethod: this.paymentForm.value.paymentMethod,
      items: [],
      }
      this.orderService.createOrder(order).subscribe((newOrder: Order) =>{
        const items = this.localstorageService.getItems().map((item: Item) =>{
         return {
          price: item.price,
          quantite: item.quantity,
          product: `/api/products/${item.product.id}`,
          orderItems: `/api/orders/${newOrder.id}`,
          service: item.product.services[0],
         } 
         
        })
        items.forEach((item: NewItem) =>{
          this.orderService.createItem(item).subscribe(() =>{
          });
        })
      });
    }
    this.paymentSuccess = true;
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
