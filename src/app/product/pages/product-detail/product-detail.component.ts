import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { switchMap } from 'rxjs';
import { Product, Tag } from 'src/app/shared/interfaces/product.interface';

import { NameUniqueValidatorService } from 'src/app/shared/services/validators/name-unique-validator.service';
import { ValidatorService } from 'src/app/shared/services/validators/validator.service';
import Swal from 'sweetalert2';
import { ModalProductEditService } from '../../services/modal-product-edit/modal-product-edit.service';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product   !:Product;
  closeResult       = '';
  tags       :Tag[] = [];

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
    private activatedRoute:ActivatedRoute,
    private productService:ProductService,
    private validatorService:ValidatorService,
    private nameUniqueValidatorService:NameUniqueValidatorService,
    private modalProductEditService:ModalProductEditService,
    private ngbModal: NgbModal,
    private fb:FormBuilder
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
          },
          error: error => {
            console.log("Ha ocurrido un error");
          }
        }
      );

    // Subscribe for notification about new image upload
    this.modalProductEditService.notifyUpload
      .subscribe(product => {
          this.product.image = product.image;
    })

    // Tags
    this.getTags();
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

    // console.log('update-form',this.updateForm.value);

    let product:any = {
      name: this.updateForm.get('name')?.value,
      price: this.updateForm.get('price')?.value,
      description: this.updateForm.get('description')?.value,
      createdAt: this.updateForm.get('createdAt')?.value,
      tags: this.tagsArray.value
    };

    // console.log('Product to send',product);

    if(this.updateForm.invalid){
      this.updateForm.markAllAsTouched();
      return;
    }

    // Sending the object to the backend form
    this.productService.updateProduct(this.product.id,product)
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
    })

    this.newTag.reset();

    let tags = this.product.tags;
    this.tagsArray.clear();

    // Adding dynamic tags array
    for (let index = 0; index < tags.length; index++) {
      this.tagsArray.push(this.createTag(tags[index].id,tags[index].name));
    }
  }

  isAValidField(field:string){
      return this.updateForm.controls[field].errors
              && this.updateForm.controls[field].touched;
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

  getTags(){
    this.productService.getTags()
      .subscribe({
        next: resp => {
          this.tags = resp;
        },
        error : e => {
          console.log("~ e", e);
        }
      })
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


}
