import { Component } from '@angular/core';
import { TeamComponent } from "../team/team.component";

@Component({
  selector: 'app-apropos',
  standalone: true,
  imports: [TeamComponent],
  templateUrl: './apropos.component.html',
  styleUrl: './apropos.component.css'
})
export class AproposComponent {

}
