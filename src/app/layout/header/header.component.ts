import { Component, OnInit } from '@angular/core';
import { ProfiluserService } from '../../shared/servicebusinesscase/profiluserservice/profiluser.service';
import { AuthService } from '../../shared/servicebusinesscase/authentification/authservice.service';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { User } from '../../typescript/entites';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [RouterLink, NgIf],
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User | null = null;  // Type plus spécifique pour l'utilisateur

  constructor(
    private authService: AuthService,
    private router: Router,
    private profiluserService: ProfiluserService,
  ) {}

  ngOnInit(): void {
    if (this.authService.isLogged()) {
      // Récupérer l'utilisateur connecté
      this.authService.fetchCurrentUser().subscribe({
        next: (user: User) => {
          this.user = user;  // Stocke l'utilisateur récupéré
          console.log('Utilisateur connecté:', user);
        },
        error: (err) => {
          console.error('Erreur lors de la récupération de l\'utilisateur', err);
        }
      });
    }
  }

  // Vérifie si l'utilisateur est connecté
  isLogged(): boolean {
    return this.authService.isLogged();
  }

  // Déconnecter l'utilisateur et rediriger
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);  // Redirection vers l'accueil ou autre route
  }
}
