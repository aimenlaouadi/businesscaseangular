
  
  export interface User {
    id: number;
    username: string;
    lastname: string;
    firstname: string;
    telephone: string;
    orders: Order[];
  }


  export interface Product {
    id: number;
    product_name: string;
    product_description: string;
    price: number;
    quantity: number;
    images:string;
    services: string[]; 
  }
  

export interface Item {
  id?: number;
  price: number;
  quantity: number;
  product: Product;
}

export interface Order {
id?: number;
user: string;
date:string;
items: string[];
depotDate: string;
paymentMethod: string;
}


export interface Service {
  id: number;
  service_type: string;
  description: string;
  images: string;
  products:string[];
}

export interface HydraCollection<T> {
  'hydra:member': T[];
  
}

export interface Token {
  exp: number;
  roles:string[];
  username: string;
  user_id: number;
}

export interface NewItem {
  price: number;
  quantite: number;
  product: string;
  orderItems: string;
  service: string;
}