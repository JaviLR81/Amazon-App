import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { HomeComponent } from './pages/home/home.component';
import { ProductHomeComponent } from './components/product-home/product-home.component';

import { BlueButtonDirective } from './directives/blue-button.directive';

@NgModule({
  declarations: [
    HomeComponent,
    BlueButtonDirective,
    ProductHomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgbModule,
    RouterModule,
    SharedModule
  ]
})
export class HomeModule { }
