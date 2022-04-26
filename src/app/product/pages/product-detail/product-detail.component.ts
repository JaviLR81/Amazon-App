import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Product } from 'src/app/shared/interfaces/product.interface';
import Swal from 'sweetalert2';
import { ModalProductEditService } from '../../services/modal-product-edit/modal-product-edit.service';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product!:Product;

  constructor(
    private activatedRoute:ActivatedRoute,
    private router: Router,
    private productService:ProductService,
    private modalProductEditService:ModalProductEditService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( params => {
            let id:number = +params['id'];
            return this.productService.getProductDetail(id)
        })
      )
      .subscribe(
        {
          next: product => {
            this.product = product;
            console.log("Mostrando el objeto al entrar",this.product);
          },
          error: error => {
            console.log("Ha ocurrido un error");
            // console.log(error);
          }
        }
      );

    // Subscribe for notification about new image upload
    this.modalProductEditService.notifyUpload
      .subscribe(product => {
          this.product.image = product.image;
      })
  }

  openModal(){
    this.modalProductEditService.openModal();
  }

}
