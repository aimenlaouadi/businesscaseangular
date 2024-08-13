import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // Importer Router pour la redirection
import { Observable } from 'rxjs';
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

  private apiUrl = 'http://localhost:8000/api/contacts';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.contactForm = this.fb.group({
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.sendContactData(this.contactForm.value).subscribe(
        () => {
          this.message = 'Votre demande a bien été prise en compte, merci!';
          this.showSuccessMessage = true;
          this.showErrorMessage = false;
          setTimeout(() => {
            this.showSuccessMessage = false;
            this.router.navigate(['/']); // Redirection vers la page d'accueil après 3 secondes
          }, 3000);
        },
        error => {
          console.error('Une erreur est survenue', error);
          this.message = 'Une erreur est survenue';
          this.showErrorMessage = true;
          setTimeout(() => {
            this.showErrorMessage = false;
          }, 1000);
        }
      );
    } else {
      alert('Veuillez remplir tous les champs du formulaire.');
    }
  }

  sendContactData(contactData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, contactData);
  }
}
