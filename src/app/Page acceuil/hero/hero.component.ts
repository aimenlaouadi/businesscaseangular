import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommentcamarcheComponent } from '../commentcamarche/commentcamarche.component';
import { NosprestationsComponent } from '../nosprestations/nosprestations.component';


@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink, CommentcamarcheComponent, NosprestationsComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {

}
