import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { BlueButtonDirective } from './directives/blue-button.directive';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    HomeComponent,
    BlueButtonDirective
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
