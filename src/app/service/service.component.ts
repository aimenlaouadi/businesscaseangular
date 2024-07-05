import { Component, OnInit } from '@angular/core';
import { Product, Service } from '../typescript/entites';
import { BusinescasserviceService } from '../shared/servicebusinesscase/businescasservice.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [NgFor],
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})
export class ServiceComponent implements OnInit{

  constructor(private service: BusinescasserviceService) {}

  services: Service[] = []; 

ngOnInit(): void {
  this.getServices();
}

getServices(){
  this.service.fetchAllServices().subscribe(data =>
    {
      this.services = data;
      console.log(this.services);
    }
  )
}

}
