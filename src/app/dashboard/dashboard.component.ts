import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy{


  ngOnInit(): void {
    document.body.classList.add('no-footer');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('no-footer');
  }



}
