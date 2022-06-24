import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';


import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError, forkJoin, map, of, switchMap, throwError } from 'rxjs';
import Swal from 'sweetalert2';


import { ProductService } from '../../services/product/product.service';
import { Brand, Product } from 'src/app/shared/interfaces/product.interface';
import { FormValidatorService } from 'src/app/shared/services/form-validator.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {


  products: Product[] = [];
  brands  : Brand[]   = [];

  productForm: FormGroup = this.fb.group({
    name: ['',Validators.required],
    description: ['',Validators.required],
    price: ['',[Validators.required,Validators.min(1)]],
    brand: this.fb.group({
      id: [null, Validators.required],
    })
  });

  constructor(
    private activatedRoute       : ActivatedRoute,
    private fb                   : FormBuilder,
    private formValidatorService : FormValidatorService,
    private productService       : ProductService,
    private ngBModal             : NgbModal
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .pipe(
        map<Params, string>(params => params['searchTerm']),
        switchMap( params =>  this.productService.getProducts())
      )
      .subscribe({
        next: resp => this.products = resp,
        error : e => {
          console.log("Ha ocurrido un error al tratar de cargar los productos", e.message);
        }
      });

      this.getInitialData();
  }

  hasValidationErrors(formGroup: FormGroup, field: string): boolean{
    return this.formValidatorService.hasValidationErrors(formGroup, field);
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
      brand_id: null
    })
  }

  getBrands(){
    return this.productService.getBrands();
  }

  getInitialData(){
    forkJoin({
        brands: this.getBrands().pipe(catchError(() => of([]))),
    }).subscribe( resp => {
            this.brands = resp.brands;
        }
    )
  }

}
