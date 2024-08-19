
  
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
}

export interface Item {
  id: number;
  price: number;
  quantite: number;
}

export interface ServiceProduct {
  id: number;
  coef: number;
  product: Product;
  items: Item[];
}

export interface Service {
  id: number;
  service_type: string;
  service_price: number;
  description: string;
  images: string;
  serviceProducts: ServiceProduct[];
}

export interface HydraCollection<T> {
  'hydra:member': T[];
  
}
