import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { ImgService } from 'src/app/shared/services/img.service';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardProductComponent {

  @Input() product!:Product;
  urlImage: string = './assets/img/alexa.png';

  constructor(private imgSerice: ImgService) {
    if(+new Date() % 2 === 0){
      this.urlImage = './assets/img/laptop.png';
    }
  }

  onImgError(event: any){
    this.imgSerice.onImgError(event);
  }
}
