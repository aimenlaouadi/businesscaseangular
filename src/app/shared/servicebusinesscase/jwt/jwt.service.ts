import { Injectable } from '@angular/core';
import {jwtDecode} from 'jwt-decode';
import { Token } from '../../../typescript/entites'; 

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  // Fonction pour décoder le token JWT
  decodeToken(token: string): Token | null {
    try {
      return jwtDecode<Token>(token);
    } catch (error) {
      console.error('Erreur lors du décodage du token JWT', error);
      return null;
    }
  }

  // Vérifier si le token est expiré (optionnel)
  isTokenExpired(token: string): boolean {
    const decoded = this.decodeToken(token);
    if (!decoded || !decoded.exp) {
      return true;
    }
    
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  }
}
