import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ImgService } from 'src/app/shared/services/img.service';
import { Product } from '../../../../shared/interfaces/product.interface';

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductHomeComponent {

  @Input() product!: Product;
  urlImage: string = './assets/img/alexa1.png';

  constructor(private imgSerice: ImgService) {
    if(+new Date() % 2 === 0){
      this.urlImage = './assets/img/laptop1.png';
    }
  }

  onImgError(event: any){
    this.imgSerice.onImgError(event);
  }
}
