import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product.interface';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardProductComponent implements OnInit {

  @Input() product!:Product;

  constructor() { }

  ngOnInit(): void {}

  onImgError(event: any){
    let url = (+new Date() % 2 === 0)
      ? './assets/img/alexa.png'
      :  './assets/img/laptop.png';
    event.target.src = url;
  }
}
