import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of, switchMap } from 'rxjs';
import { Product } from 'src/app/shared/interfaces/product.interface';
import Swal from 'sweetalert2';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {


  products:Product[] = [];

  productForm: FormGroup = this.fb.group({
    name: ['',Validators.required],
    description: ['',Validators.required],
    price: ['',[Validators.required,Validators.min(1)]],
    image: ['no-image.png',Validators.required],
  });

  constructor(
    private activatedRoute:ActivatedRoute,
    private productService:ProductService,
    private fb:FormBuilder,
    private ngBModal:NgbModal
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .pipe(
        switchMap( params => {

          let searchTerm:string = params['searchTerm'];

          if(searchTerm){
            // Do a search with specific parameter
            return this.productService.getProducts();
          }else{
            // Do a general products search
            return this.productService.getProducts();
          }
        })
      )
      .subscribe({
        next: resp => {
          this.products = resp;
        },
        error : e => {
          console.log("Ha ocurrido un error al tratar de cargar los productos");
        }
      });
  }

  isAValidField(field:string){

    let hasErrors = this.productForm.controls[field].errors == null ? false :true;

    return  this.productForm.controls[field].touched
            &&
            hasErrors;
  }

  saveProduct(){

    if(this.productForm.invalid){
      this.productForm.markAllAsTouched();
      return;
    }

    this.productService.saveProduct(this.productForm.value)
      .subscribe({
        next: resp => {
          this.products.push(resp);
          this.ngBModal.dismissAll();
          Swal.fire("Correcto","Producto correctamente registrado","success");
        },
        error : e => {
          console.log("Ha ocurrido un error al tratar de guardar el producto");
        }
      })

  }

  openModal(content:any){
    this.ngBModal.open(content);

    this.productForm.reset({
      name: '',
      description: '',
      price: '',
      image: 'no-image.png',
    })
  }

}
