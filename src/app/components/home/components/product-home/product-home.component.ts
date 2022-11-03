import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Product } from '../../../../shared/interfaces/product.interface';

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductHomeComponent implements OnInit {

  @Input() product!: Product;

  constructor() { }

  ngOnInit(): void {
  }

  onImgError(event: any){
    let url = (+new Date() % 2 === 0)
      ? './assets/img/alexa.png'
      :  './assets/img/laptop.png';
    event.target.src = url;
  }


}
