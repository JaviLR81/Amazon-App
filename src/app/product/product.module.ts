import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductRoutingModule } from './product-routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ModalProductEditComponent } from './components/modal-product-edit/modal-product-edit.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ModalProductEditComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class ProductModule { }
