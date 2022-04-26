import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { HomeService } from 'src/app/shared/services/home/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  // products:Product[] = [];
  products:Product[] = [
    {
      id:1,
      name:'Microsoft Keyboard',
      price:2.0,
      image: 'Some Image',
      description: 'The new Microsoft Keyboard',
      createdAt: new Date(),
      brand: {
        id: 1,
        name: 'Microsoft',
        createdAt: new Date()
      }
    }
  ];



  constructor(private homeService:HomeService) { }

  ngOnInit(): void {
    this.homeService.getProducts()
      .subscribe({
          next: products => {
            // this.products = products;
            console.log("~ this.products", this.products);
          },
          error: () => {
            console.log("An error ocurred while trying to load the products");
          }
        }
      );
  }

}
