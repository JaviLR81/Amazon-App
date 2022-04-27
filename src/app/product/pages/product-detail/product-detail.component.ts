import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  closeResult = '';

  // Declaring reactive form

  /**
   * fb:FormBuilder : Se utiliza para crear objetos complejos
   * sin el operador new como es un servicio se debe de inyectar por
   * constructor
   *
   */

  // updateForm: FormGroup = new FormGroup({
  //   name        : new FormControl('RTX 4080ti'),
  //   price       : new FormControl('Jeje'),
  //   description : new FormControl('Jeje2'),
  //   createdAt   : new FormControl('Jeje2'),
  // })

  updateForm: FormGroup = this.fb.group({
    name: ['',[Validators.required, Validators.minLength(3)]],
    price: ['',[Validators.required,Validators.min(0)]],
    description: ['',[Validators.required]],
    createdAt: [null,[Validators.required]],

    // Form array
    tags: this.fb.array([
      // ['Tvs',Validators.required],
      // ['Electronics',Validators.required],
      // ],Validators.required)
    ])
  });

  // A control that dont belongs to the updateForm
  // In the html form ew should call to this control with [FormControl]
  // with [] becasue it's not part of the form
  newTag: FormControl = this.fb.control('',Validators.required);

  constructor(
    private activatedRoute:ActivatedRoute,
    private productService:ProductService,
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
  }

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

  update(){

    let product:any = {
      name: this.updateForm.get('name')?.value,
      price: this.updateForm.get('price')?.value,
      description: this.updateForm.get('description')?.value,
      createdAt: this.updateForm.get('createdAt')?.value,
    };

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


  }

  populateUpdateForm(){

    // Opción para establecer un valor
    this.updateForm.reset({
      name: this.product.name,
      price: this.product.price,
      description: this.product.description,
      createdAt: this.product.createdAt
    })

    // Otra opción para llenar el formulario
    // this.updateForm.setValue({
    //   name: product.name,
    //   price: product.price,
    //   description: product.description,
    //   createdAt: product.createdAt
    // });

  }

  isAValidField(field:string){
      return this.updateForm.controls[field].errors
              && this.updateForm.controls[field].touched;
  }

  // Form Array fields
  addTag(){

    if(this.newTag.invalid){
      return;
    }

    // (this.updateForm.controls['favoritos'] as FormArray).push();

    // 1° Option
    // this.tagsArray.push(
    //   new FormControl( this.newTag.value,Validators.required )
    // );

    // 2° Option
    this.tagsArray.push(
      this.fb.control(this.newTag.value,Validators.required)
    );

    this.newTag.reset();
  }

  deleteTag(index:number){
    if(this.tagsArray.length > 2){
      this.tagsArray.removeAt(index);
    }
  }

  get tagsArray(){
    return this.updateForm.get('tags') as FormArray;
  }


}
