import { Component, OnInit } from '@angular/core';
import { ProfiluserService } from '../shared/servicebusinesscase/profiluserservice/profiluser.service';
import { AuthService } from '../shared/servicebusinesscase/authentification/authservice.service';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { User } from '../typescript/entites';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,  
  imports: [RouterLink, NgIf],  
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User | null = null;

  constructor(
    private profilUserService: ProfiluserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isLogged()) {
      this.authService.fetchCurrentUser().subscribe((user: User) => {
        this.user = user;
      });
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
