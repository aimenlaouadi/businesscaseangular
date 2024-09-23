import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../shared/servicebusinesscase/user/user.service';
import { AuthService } from '../../shared/servicebusinesscase/authentification/authservice.service'; 

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {

  userService = inject(UserService);
  authService = inject(AuthService); 
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
      this.userService.register(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Inscription réussie', response);
          this.isRegistrationSuccessful = true;
          this.showPopup = true;
          this.registrationError = null;

          // Connexion automatique après inscription
          this.authService.login({
            username: this.loginForm.value.username,
            password: this.loginForm.value.password
          }).subscribe({
            next: (loginResponse) => {
              this.authService.saveToken(loginResponse.token); // Sauvegarde du token
             
              setTimeout(() => {
                this.showPopup = false;
                this.router.navigate(['/']); // Redirection après connexion
              }, 3000);
            },
            error: (loginError) => {
              console.error('Erreur lors de la connexion', loginError);
              this.registrationError = 'Une erreur est survenue lors de la connexion.';
            }
          });
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
