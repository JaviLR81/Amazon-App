import { Inventory } from "./inventory.interface";

export interface Product {
  id:          number;
  name:        string;
  description: string;
  price:       number;
  image:       string;
  createdAt:   Date;
  brand?:      Brand;
  tags:        Tag[];
  inventory:   Inventory;
}

export interface Brand {
  id:        number;
  name:      string;
  createdAt: Date;
}

export interface Tag {
  id: number;
  name: string;
  createdAt: Date;
}
