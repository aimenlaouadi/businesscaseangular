import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/servicebusinesscase/authentification/authservice.service';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,  
  imports: [RouterLink, NgIf],  
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: any;  

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.isLogged()) {
      this.user = this.authService.getCurrentUser(); // Récupère les infos de l'utilisateur
    }
  }

  isLogged(): boolean {
    return this.authService.isLogged();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
