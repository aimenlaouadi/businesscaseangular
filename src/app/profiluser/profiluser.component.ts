import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators, FormGroup } from '@angular/forms';
import { ProfiluserService } from '../shared/servicebusinesscase/profiluserservice/profiluser.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/servicebusinesscase/authentification/authservice.service';

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
      this.profiluserService.getUser(userId).subscribe(
        user => {
          this.user = user;
          this.form = new FormGroup({
            username: new FormControl(this.user.username, [Validators.required]),
            lastname: new FormControl(this.user.lastname, [Validators.required]),
            firstname: new FormControl(this.user.firstname, [Validators.required]),
            telephone: new FormControl(this.user.telephone, [Validators.required])
          });
        },
        error => {
          console.error('Erreur lors de la récupération de l\'utilisateur', error);
          this.message = 'Erreur lors de la récupération de l\'utilisateur';
          this.showErrorMessage = true;
        }
      );
    });
  }

  updateUser(): void {
    if (this.form.valid) {
      this.profiluserService.updateUser(this.user.id, this.form.value).subscribe(
        () => {
          this.message = 'Votre demande a bien été prise en compte, merci!';
          this.showSuccessMessage = true;
          this.showErrorMessage = false;
          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 3000);
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
        this.message = 'Votre profil a bien été supprimé, merci!';
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
