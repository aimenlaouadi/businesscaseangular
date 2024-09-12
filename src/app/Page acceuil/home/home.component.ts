import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { CommentcamarcheComponent } from '../commentcamarche/commentcamarche.component';
import { NosprestationsComponent } from '../nosprestations/nosprestations.component';
import { AvissclientsComponent } from '../avissclients/avissclients.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, CommentcamarcheComponent, NosprestationsComponent, AvissclientsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
