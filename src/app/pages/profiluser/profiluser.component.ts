import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfiluserService } from '../../shared/servicebusinesscase/profiluserservice/profiluser.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../shared/servicebusinesscase/authentification/authservice.service';
import { CommonModule } from '@angular/common';
import { JwtService } from '../../shared/servicebusinesscase/jwt/jwt.service';

@Component({
  selector: 'app-profiluser',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './profiluser.component.html',
  styleUrls: ['./profiluser.component.css']
})
export class ProfiluserComponent implements OnInit {
  user: any = {};
  form!: FormGroup;
  message: string = '';
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;
  

  constructor(
    private fb: FormBuilder,
    private profiluserService: ProfiluserService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private jwt: JwtService,
  ) {}

  iduser: number = this.jwt.getDecodeToken().user_id;

  ngOnInit(): void {
    // Initialisation du formulaire

    this.form = this.fb.group({
      username: ['', Validators.required],
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // Validation du numéro de téléphone à 10 chiffres
      password: ['', [Validators.required, Validators.minLength(6)]],  // Ajout du champ mot de passe avec validation
      confirmPassword: ['', Validators.required],  // Champ de confirmation du mot de passe
    }, { validator: this.passwordMatchValidator });
    this.loadUser();
 
    
  }

  // Fonction pour charger les données utilisateur
  loadUser(): void {
    this.profiluserService.getUser(this.iduser).subscribe(
      user => {
        this.user = user;
        console.log(this.user);
        this.form.patchValue({
          username: this.user.username,
          lastname: this.user.lastname,
          firstname: this.user.firstname,
          telephone: this.user.telephone,
          password: '',
          confirmPassword: ''
        });
      },
      error => {
        this.showError('Erreur lors de la récupération de l\'utilisateur');
      }
    );
  }

  // Validation de correspondance des mots de passe
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  // Fonction pour mettre à jour l'utilisateur
  updateUser(): void {
    if (this.form.valid) {
      const updatedUser = this.form.value;
      updatedUser.id = this.user.id;

      this.profiluserService.updateUser(updatedUser.id, updatedUser).subscribe(
        response => {
          this.showSuccess('Votre profil a été mis à jour avec succès!');
          setTimeout(() => this.router.navigateByUrl('/connexion'), 1000);
        },
        error => {
          this.showError('Erreur lors de la mise à jour du profil');
        }
      );
    } else {
      this.form.markAllAsTouched(); // Marquer tous les champs comme touchés pour afficher les erreurs
    }
  }

  // Fonction pour supprimer l'utilisateur
  deleteUser(): void {
    this.profiluserService.deleteUser(this.user.id).subscribe(
      () => {
        this.showSuccess('Votre profil a été supprimé avec succès!');
        setTimeout(() => {
          this.authService.logout();
          this.router.navigateByUrl('/');
        }, 3000);
      },
      error => {
        this.showError('Erreur lors de la suppression du profil');
      }
    );
  }

  // Afficher un message de succès
  private showSuccess(message: string): void {
    this.message = message;
    this.showSuccessMessage = true;
    this.showErrorMessage = false;
  }

  // Afficher un message d'erreur
  private showError(message: string): void {
    this.message = message;
    this.showSuccessMessage = false;
    this.showErrorMessage = true;
  }
}
