import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product!:Product;

  constructor(
    private activatedRoute:ActivatedRoute,
    private productService:ProductService,
  ) { }

  ngOnInit(): void {
    // this.activatedRoute.params
    //   .pipe(
    //     switchMap( params => {
    //         let id:number = +params['id'];
    //         return this.productService.getProductDetail(id)
    //     })
    //   )
    //   .subscribe( product => {
    //       console.log("Obteniendo el producto buscado");
    //   })

    this.activatedRoute.paramMap
      .subscribe(params => {
        let id:number = +params.get('id')!;
        console.log("Aquí es en donde hariamos una petición");
      })
  }

}
