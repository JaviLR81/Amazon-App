import { EventEmitter, Injectable } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ModalProductEditService {

  private _modal:boolean = false;
  // TODO: Check change for Behaviour subject
  notifyUpload:EventEmitter<Product> = new EventEmitter();

  constructor() { }

  openModal():void{
    this._modal = true;
  }

  closeModal():void{
    this._modal = false;
  }

  modal():boolean{
    return this._modal;
  }
}
