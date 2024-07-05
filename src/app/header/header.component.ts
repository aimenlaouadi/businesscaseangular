import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../shared/servicebusinesscase/authservice.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private authService: AuthService, private router: Router) { }

  
  isLogged(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }


  logout(): void {
    this.authService.logout();
  }


}
