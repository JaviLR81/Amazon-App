import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductRoutingModule } from './product-routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ModalProductEditComponent } from './components/modal-product-edit/modal-product-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CardProductComponent } from './components/card-product/card-product.component';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [
    // Pages
    ProductListComponent,
    ProductDetailComponent,
    // Components
    ModalProductEditComponent,
    CardProductComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgSelectModule
  ]
})
export class ProductModule { }
