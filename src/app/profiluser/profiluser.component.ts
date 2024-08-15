import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators, FormGroup } from '@angular/forms';
import { ProfiluserService } from '../shared/servicebusinesscase/profiluserservice/profiluser.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/servicebusinesscase/authentification/authservice.service';
import { User } from '../typescript/entites';

@Component({
  selector: 'app-profiluser',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './profiluser.component.html',
  styleUrls: ['./profiluser.component.css']
})
export class ProfiluserComponent implements OnInit {
  user: any = {};
  form: FormGroup = new FormGroup({});
  message: string = '';
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;

  constructor(
    private profiluserService: ProfiluserService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = +params['id']; // assurez-vous que l'ID est un nombre
      if (!isNaN(userId)) {
        this.profiluserService.getUser(userId).subscribe(
          user => {
            this.user = user;
            this.form = new FormGroup({
              username: new FormControl(this.user.username, [Validators.required]),
              lastname: new FormControl(this.user.lastname, [Validators.required]),
              firstname: new FormControl(this.user.firstname, [Validators.required]),
              telephone: new FormControl(this.user.telephone, [Validators.required]),
              password: new FormControl(this.user.password, [Validators.required]),
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
      const updatedUser: User = {
        id: this.user.id,
        username: this.form.get('username')?.value,
        lastname: this.form.get('lastname')?.value,
        firstname: this.form.get('firstname')?.value,
        telephone: this.form.get('telephone')?.value,
        password: this.form.get('password')?.value,
      };
  
      console.log('Données à envoyer pour la mise à jour :', updatedUser); // Vérification des données
      
      this.profiluserService.updateUser(updatedUser.id, updatedUser).subscribe(
        (response) => {
          console.log(response);
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
