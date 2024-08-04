import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AvissclientsComponent } from "../avissclients/avissclients.component";

@Component({
  selector: 'app-nosprestations',
  standalone: true,
  imports: [RouterLink, AvissclientsComponent],
  templateUrl: './nosprestations.component.html',
  styleUrl: './nosprestations.component.css'
})
export class NosprestationsComponent {

}
