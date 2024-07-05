import { Component, OnInit } from '@angular/core';
import { BusinescasproductService } from '../shared/servicebusinesscase/businescasproduct.service';
import { Product } from '../typescript/entites';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NgFor],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{

  constructor(private service: BusinescasproductService) {}

  products: Product[] = []; 

ngOnInit(): void {
  this.getProducts();
}

getProducts(){
  this.service.fetchAllProducts().subscribe(data =>
    {
      this.products = data;
      console.log(this.products);
    }
  )
}

}
