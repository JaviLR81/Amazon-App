import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component';

// Implementing lazy loading
const routes: Routes = [
  {
    path: '',
    component: ProductListComponent
  },
  {
    path: '**',
    redirectTo: 'product'
  },
];

@NgModule({
  imports: [
      RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProductRoutingModule { }
