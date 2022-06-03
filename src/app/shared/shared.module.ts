import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { RouterModule } from '@angular/router';
import { EnlargeImageDirective } from './directives/enlarge-image.directive';
import { EnlargeImageHoverDirective } from './directives/enlarge-image-hover.directive';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NotFoundPageComponent,
    EnlargeImageDirective,
    EnlargeImageHoverDirective
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    NotFoundPageComponent,
    EnlargeImageDirective,
    EnlargeImageHoverDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    RouterModule
  ]
})
export class SharedModule { }
