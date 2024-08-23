import { CommonModule, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../shared/servicebusinesscase/user/user.service';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, CommonModule],
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {

  service = inject(UserService);
  router = inject(Router);

  public loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    telephone: new FormControl('', [Validators.required, Validators.pattern('^\\+?[0-9]{10,}$')]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    firstname: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  isRegistrationSuccessful: boolean = false;
  showPopup: boolean = false;
  isSubmitting: boolean = false;
  registrationError: string | null = null;

  onSubmit() {
    if (this.loginForm.valid) {
      this.isSubmitting = true;
      this.service.register(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Inscription réussie', response);
          this.isRegistrationSuccessful = true;
          this.showPopup = true;
          this.registrationError = null;
          console.log(this.loginForm.value);
          setTimeout(() => {
            this.showPopup = false;
            this.router.navigate(['connexion']);
          }, 3000);
        },
        error: (error) => {
          console.error('Erreur inscription', error);
          this.isRegistrationSuccessful = false;
          this.showPopup = false;
          this.isSubmitting = false;
          if (error.status === 409) {
            this.registrationError = 'Le nom d\'utilisateur existe déjà. Veuillez en choisir un autre.';
          } else {
            this.registrationError = 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer plus tard.';
          }
          console.log(this.loginForm.value);
        }
      });
    } else {
      console.log('Formulaire invalide');
      this.loginForm.markAllAsTouched();
    }
  }


  hasError(controlName: string, errorName: string): boolean {
    return this.loginForm.controls[controlName].hasError(errorName) && this.loginForm.controls[controlName].touched;
  }
}
