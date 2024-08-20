import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfiluserService } from '../shared/servicebusinesscase/profiluserservice/profiluser.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/servicebusinesscase/authentification/authservice.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profiluser',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './profiluser.component.html',
  styleUrls: ['./profiluser.component.css']
})
export class ProfiluserComponent implements OnInit {
  user: any = {};
  form: FormGroup;
  message: string = '';
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;

  constructor(
    private fb: FormBuilder,
    private profiluserService: ProfiluserService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    // Initialisez le formulaire ici
    this.form = this.fb.group({
      username: ['', Validators.required],
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      telephone: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = +params['id']; 
      if (!isNaN(userId)) {
        this.profiluserService.getUser(userId).subscribe(
          user => {
            this.user = user;
            
            this.form.patchValue({
              username: this.user.username,
              lastname: this.user.lastname,
              firstname: this.user.firstname,
              telephone: this.user.telephone,
              password: this.user.password, 
            });
          },
          error => {
            console.error('Erreur lors de la récupération de l\'utilisateur', error);
            this.message = 'Erreur lors de la récupération de l\'utilisateur';
            this.showErrorMessage = true;
          }
        );
      } else {
        this.message = 'ID utilisateur invalide';
        this.showErrorMessage = true;
      }
    });
  }

  updateUser(): void {
    if (this.form.valid) {
      const updatedUser = this.form.value;
      updatedUser.id = this.user.id;

      this.profiluserService.updateUser(updatedUser.id, updatedUser).subscribe(
        response => {
          this.message = 'Votre profil a été mis à jour avec succès!';
          this.showSuccessMessage = true;
          this.showErrorMessage = false;
          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 1000);
        },
        error => {
          console.error('Erreur lors de la mise à jour du profil', error);
          this.message = 'Erreur lors de la mise à jour du profil';
          this.showErrorMessage = true;
        }
      );
    }
  }

  deleteUser(): void {
    this.profiluserService.deleteUser(this.user.id).subscribe(
      () => {
        this.message = 'Votre profil a été supprimé avec succès!';
        this.showSuccessMessage = true;
        this.showErrorMessage = false;
        setTimeout(() => {
          this.showSuccessMessage = false;
          this.router.navigateByUrl('/');
          this.authService.logout();
        }, 3000);
      },
      error => {
        console.error('Erreur lors de la suppression du profil', error);
        this.message = 'Erreur lors de la suppression du profil';
        this.showErrorMessage = true;
      }
    );
  }
}
