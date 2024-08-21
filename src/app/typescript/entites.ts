
  
  export interface User {
    id: number;
    username: string;
    lastname: string;
    firstname: string;
    telephone: string;
    password: string;
  }


  export interface Product {
    id: number;
    product_name: string;
    product_description: string;
    price: number; 
  }
  

export interface Item {
  id: number;
  price: number;
  quantite: number;
  product: Product;
}


export interface Service {
  id: number;
  service_type: string;
  service_price: number;
  description: string;
  images: string;
  products:string[];
}

export interface HydraCollection<T> {
  'hydra:member': T[];
  
}
