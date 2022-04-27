export interface Product {
  id:          number;
  name:        string;
  description: string;
  price:       number;
  image:       string;
  createdAt:   Date;
  brand?:       Brand;
}

export interface Brand {
  id:        number;
  name:      string;
  createdAt: Date;
}
