import { Component } from '@angular/core';
import { TeamComponent } from '../team/team.component';
import { CommentcamarcheComponent } from '../commentcamarche/commentcamarche.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [TeamComponent, CommentcamarcheComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {

}
