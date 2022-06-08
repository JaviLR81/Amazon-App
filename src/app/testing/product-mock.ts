import { Product, Tag } from "../shared/interfaces/product.interface";
import { inventoryLineMock } from "./inventory-mock";


export let tag:Tag = {
  id: 1,
  name: 'Cocina',
  createdAt: new Date()
};

export let tags:Tag[] = [tag];

export let product:Product = {
  id: 1,
  name: 'Samsung',
  image: 'some-image.png',
  description: 'some_description',
  price: 123.5,
  createdAt: new Date(),
  brand: {
    id: 1,
    name: 'Samsung',
    createdAt: new Date()
  },
  tags: tags,
  inventory: inventoryLineMock
};

export let products:Product[] = [product];
