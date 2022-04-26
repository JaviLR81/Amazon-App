import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { ProductService } from '../../services/product/product.service';
import { ModalProductEditService } from '../../services/modal-product-edit/modal-product-edit.service';

import { Product } from 'src/app/shared/interfaces/product.interface';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-product-edit',
  templateUrl: './modal-product-edit.component.html',
  styleUrls: ['./modal-product-edit.component.css']
})
export class ModalProductEditComponent implements OnInit, OnDestroy {

  @Input() product!:Product;
  fotoSeleccionada:any;

  constructor(
    private modalProductEditService:ModalProductEditService,
    private productService:ProductService
  ) { }

  ngOnInit(): void {
  }

  // Setting to false the variable to show modal
  ngOnDestroy(): void {
    this.modalProductEditService.closeModal();
  }


  seleccionarFoto(event:any){
    this.fotoSeleccionada = event.target.files[0];

    if(this.fotoSeleccionada.type.indexOf('image') < 0){
      this.fotoSeleccionada = null;
      Swal.fire("Error","Debe seleccionar una imagen","error");
      return;
    }
  }

  subirFoto(){
    if(!this.fotoSeleccionada){
      Swal.fire("Error","Debe seleccionar al menos una imagen","error");
      return;
    }

    this.productService.uploadProductImage(this.fotoSeleccionada as File,this.product.id)
      .subscribe({
        next: resp => {
          this.product = resp;

          // At this point we can close the modal and emit the changes
          this.modalProductEditService.notifyUpload.emit(this.product);

          Swal.fire("Ok","Image upload succesfully","success");

        },
        error: error => {
          console.log("Ha ocurrido un error al tratar de subir la imagen");
        }
      })
  }

  closeModal(){
    this.modalProductEditService.closeModal();
    this.fotoSeleccionada = null;
  }

  shouldShowModal(){
    return this.modalProductEditService.modal();
  }

}
