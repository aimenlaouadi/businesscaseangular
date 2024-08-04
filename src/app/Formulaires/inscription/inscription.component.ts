import { CommonModule, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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

  public loginForm: FormGroup = new FormGroup ({
    username: new FormControl(''),
    password: new FormControl(''),
    telephone: new FormControl(''),
    lastname: new FormControl(''),
    firstname: new FormControl(''),
  });

  isRegistrationSuccessful: boolean = false;
  showPopup: boolean = false;
  isSubmitting: boolean = false;

  onSubmit() {
    if (this.loginForm.valid) {
      this.isSubmitting = true; 
      this.service.register(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Inscription réussie', response);
          this.isRegistrationSuccessful = true;
          this.showPopup = true;
          console.log(this.loginForm.value);
          setTimeout(() => {
            this.showPopup = false;
            this.router.navigate(['/']); 
          }, 3000); 
        },
        error: (error) => {
          console.error('Erreur inscription', error);
          this.isRegistrationSuccessful = false;
          this.showPopup = false;
          this.isSubmitting = false; 
          console.log(this.loginForm.value);
        }
      });
    } else {
      console.log('Formulaire invalide');
    }
  }
}
