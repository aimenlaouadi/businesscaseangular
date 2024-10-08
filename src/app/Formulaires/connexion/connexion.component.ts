import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/servicebusinesscase/authentification/authservice.service';


@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css'
})
export class ConnexionComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({}); 

  constructor(private authService: AuthService, private router: Router) { }
 
  ngOnInit() {
    this.loginForm = new FormGroup({
      credentials: new FormGroup({
        username: new FormControl('', [Validators.required, Validators.minLength(3)]),
        password: new FormControl('', [Validators.required, Validators.minLength(3)])
      })
    });
  }
 
  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value.credentials;
      this.authService.login({ username, password }).subscribe(
        (token) => {
          console.log('Token received:', token); 
          this.authService.saveToken(token.token);
         
          this.router.navigate(['payment']); 
        },
        error => {
          console.error('Login failed', error);
          // Gérer les erreurs de connexion ici (par exemple, afficher un message d'erreur)
        }
      );
    }
  }
 }


