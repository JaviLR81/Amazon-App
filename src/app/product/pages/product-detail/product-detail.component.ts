import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';

import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError,
        filter,
        forkJoin,
        Observable,
        of,
        Subscription
} from 'rxjs';
import Swal from 'sweetalert2';

import { FormValidatorService } from '../../../shared/services/form-validator.service';
import { ModalProductEditService } from '../../services/modal-product-edit/modal-product-edit.service';
import { NameUniqueValidatorService } from '../../../shared/services/validators/name-unique-validator.service';
import { ProductService } from '../../services/product/product.service';
import { ValidatorService } from '../../../shared/services/validators/validator.service';

import { AppState } from '../../../store/app.reducers';
import * as actions from '../../../store/actions';

import { Brand, Product, Tag } from '../../../shared/interfaces/product.interface';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  product   !: Product;
  closeResult: string = '';
  tags       : Tag[] = [];
  brands     : Brand[] = [];
  userSubs  !: Subscription;

  /** MODALS */

  /**
   * fb:FormBuilder : Se utiliza para crear objetos complejos
   * sin el operador new como es un servicio se debe de inyectar por
   * constructor
   *
   */
  updateForm: FormGroup = this.fb.group({
    name: ['',[Validators.required, Validators.minLength(3)],[this.nameUniqueValidatorService]],
    price: ['',[Validators.required, this.validatorService.shouldBeANumber, this.validatorService.shouldBeMajorThanZero]],
    description: ['',[Validators.required]],
    createdAt: [null,[Validators.required]],
    brand: this.fb.group({
      id: [null, Validators.required]
    }),
    // Form array
    tags: this.fb.array([])
    },{
    validators: [ this.validatorService.descriptionShouldContainName('name','description') ]
  });

  get tagsArray(){
    return this.updateForm.get('tags') as FormArray;
  }

  // A control that dont belongs to the updateForm
  // In the html form ew should call to this control with [FormControl]
  // with [] becasue it's not part of the form
  newTag: FormControl = this.fb.control('',Validators.required);

  constructor(
    private activatedRoute             : ActivatedRoute,
    private productService             : ProductService,
    private nameUniqueValidatorService : NameUniqueValidatorService,
    private modalProductEditService    : ModalProductEditService,
    private validatorService           : ValidatorService,
    private formValidatorService       : FormValidatorService,
    private ngbModal                   : NgbModal,
    private fb                         : FormBuilder,
    private store                      : Store<AppState>
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe( params =>{
          let id: number = +params['id'];
          this.store.dispatch( actions.loadProductById({id: id}) );
        }
      );

    this.getInitialData();

    // Store Subscription
    this.userSubs = this.store.select('user')
                      .pipe(filter( user => user !== null ))
                      .subscribe( ({product}) => this.product = product)
  }

  ngOnDestroy(){
    this.userSubs.unsubscribe();
    this.store.dispatch( actions.clearProductStore() );
  }


  /** MODALS */

  openModal(){
    this.modalProductEditService.openModal();
  }

  // Modal for edit data no image
  open(content:any) {

    this.populateUpdateForm();

    this.ngbModal.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  /** Send and validate FORMS */

  update(){

    if(this.updateForm.invalid){
      this.updateForm.markAllAsTouched();
      return;
    }

    // Sending the object to the backend form
    this.productService.updateProduct(this.product.id, this.updateForm.value)
      .subscribe({
        next: product => {
          this.product = product;
          this.ngbModal.dismissAll();
          Swal.fire('Correcto','El producto ha sido actualizado correctamente','success');
        },
        error: e => {
          Swal.fire('Oops','Ha ocurrido un error al tratar de actualizar el producto','info');
        }
      })


    // Creating the product to send
    this.updateForm.reset();
    this.newTag.reset();
    this.tagsArray.clear();
  }

  populateUpdateForm(){

    // Opción para establecer un valor
    this.updateForm.reset({
      name: this.product.name,
      price: this.product.price,
      description: this.product.description,
      createdAt: this.product.createdAt,
      brand: {
        id: this.product.brand.id
      }
    })

    this.newTag.reset();

    let tags = this.product.tags;
    this.tagsArray.clear();

    // Adding dynamic tags array
    for (let index = 0; index < tags.length; index++) {
      this.tagsArray.push(this.createTag(tags[index].id,tags[index].name));
    }
  }


  hasValidationErrors(formGroup: FormGroup, field: string): boolean{
    return this.formValidatorService.hasValidationErrors(formGroup, field);
  }

  getErrorMsj(field:string){
    const fieldErrors = this.updateForm.get(field)?.errors;

    if(fieldErrors?.['required']){
      return 'El campo es obligatorio';
    }else if(fieldErrors?.['isANumber']){
      return 'El campo debe ser númerico';
    }else if(fieldErrors?.['isNotZero']){
      return 'El campo debe ser mayor a cero';
    }else if(fieldErrors?.['containsName']){
      return 'La descripción debe contener el nombre del producto';
    }else if(fieldErrors?.['nameIsUnique']){
      return 'El nombre debe ser único';
    }

    return '';
  }


  /** TAGS */

  getTags(): Observable<Tag[]>{
    return this.productService.getTags();
  }

  // Create and format the object for add in the form array
  createTag(id:number,name:string){
    return this.fb.group(
      {
        id: [id,[Validators.required,Validators.pattern("[0-9]*")]],
        name: [name,Validators.required]
      }
    )
  }

  // Adds a tag to the form array
  addTag(){
    // Check invalid independent form control
    if(this.newTag.invalid){
      this.newTag.markAsTouched();
      return;
    }

    let exists = this.tagsArray.value.filter((object:any) => object.id === this.newTag.value['id']);

    if(exists.length > 0){
      Swal.fire('Oops','El elemento ya existe en el arreglo','info');
      return;
    }

    this.tagsArray.push(
      this.createTag(this.newTag.value['id'],this.newTag.value['name'])
    );

    this.newTag.reset();
  }

  deleteTag(index:number){
    this.tagsArray.removeAt(index);
  }

  /** BRANDS */

  getBrands(): Observable<Brand[]>{
    return this.productService.getBrands();
  }

  getInitialData(){
    forkJoin({
        brands: this.getBrands().pipe(catchError(() => of([]))),
        tags  : this.getTags().pipe(catchError(() => of([])))
    }).subscribe( resp => {
            this.brands = resp.brands;
            this.tags   = resp.tags;
        }
    )
  }

  /** CART */

  addToCart(){
      this.store.dispatch( actions.setCartItem({cartItem: this.product}) );
  }


}
