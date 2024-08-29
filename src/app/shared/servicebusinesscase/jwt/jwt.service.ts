import { Injectable } from '@angular/core';
import {jwtDecode} from 'jwt-decode';
import { Token } from '../../../typescript/entites'; 

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  // Fonction pour décoder le token JWT
  
  /*decodeToken(token: string): Token | null {
    try {
      return jwtDecode<Token>(token);
    } catch (error) {
      console.error('Erreur lors du décodage du token JWT', error);
      return null;
    }
  }*/


   getToken(): string {
    return localStorage.getItem("token") || "";
   } 

   getDecodeToken(): Token {
    return jwtDecode(this.getToken());
   }

}
