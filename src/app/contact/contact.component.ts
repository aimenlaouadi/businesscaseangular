import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../shared/servicebusinesscase/contact/contact.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm: FormGroup;
  message: string = '';
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;

  constructor(private fb: FormBuilder, private contactService: ContactService, private router: Router) {
    this.contactForm = this.fb.group({
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.contactService.register(this.contactForm.value).subscribe(
        () => {
          this.message = 'Votre demande a bien été prise en compte, merci!';
          this.showSuccessMessage = true;
          this.showErrorMessage = false;
          setTimeout(() => {
            this.showSuccessMessage = false;
            this.router.navigate(['/']);
          }, 3000);
        },
        error => {
          console.error('Une erreur est survenue', error);
          this.message = 'Une erreur est survenue';
          this.showErrorMessage = true;
          setTimeout(() => {
            this.showErrorMessage = false;
          }, 3000);
        }
      );
    } else {
      alert('Veuillez remplir tous les champs du formulaire.');
    }
  }
}
