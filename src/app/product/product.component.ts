import { Component, OnInit } from '@angular/core';
import { Product } from '../typescript/entites';
import { NgFor } from '@angular/common';
import { EntityService } from '../entity.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NgFor],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  providers: [EntityService, { provide: 'baseUri',
  useValue: '/api/products' }],  

})
export class ProductComponent implements OnInit{

  constructor(private service: EntityService<Product>) {}

  products: Product[] = []; 

ngOnInit(): void {
  this.getProducts();
}

getProducts(){
  this.service.fetchAll().subscribe((data) =>
    {
      this.products = data['hydra:member'];
      console.log(this.products);
    }
  )
}

}
