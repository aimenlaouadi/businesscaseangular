import { Component, OnInit } from '@angular/core';
import { Service } from '../typescript/entites';
import { NgFor } from '@angular/common';
import { EntityService } from '../entity.service';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [NgFor],
  templateUrl: './service.component.html',
  styleUrl: './service.component.css',
  providers: [EntityService, { provide: 'baseUri',
    useValue: '/api/services' }],  
})
export class ServiceComponent implements OnInit{

  constructor(private service: EntityService<Service>) {}

  services: Service[] = []; 

ngOnInit(): void {
  this.getServices();
}

getServices(){
  this.service.fetchAll().subscribe((data) =>
    {
      this.services = data['hydra:member'];
      console.log(this.services);
    }
  )
}

}
