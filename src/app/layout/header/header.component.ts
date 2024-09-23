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
 user: any = {};
  iduser: number | null = null;  // Ajout de la propriété iduser

  constructor(
    private authService: AuthService,
    private router: Router,
    private profiluserService: ProfiluserService,
  ) {}

  ngOnInit(): void {
    if (this.authService.isLogged()) {
      this.authService.fetchCurrentUser().subscribe((user: User) => {
        this.user = user;
        this.iduser = user.id;  // Enregistre l'id de l'utilisateur connecté
        console.log('Utilisateur connecté:', user);
      });
      this.loadUser();
    }
  }


  loadUser(): void {
    if (this.iduser) {
      this.profiluserService.getUser(this.iduser).subscribe((data: User) => {
        this.user = data;
       
      });
    }
  }

  // Vérifie si l'utilisateur est connecté
  isLogged(): boolean {
    return this.authService.isLogged();
  }

  // Déconnecter l'utilisateur
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
