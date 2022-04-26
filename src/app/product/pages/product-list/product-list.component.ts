import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .pipe(
        switchMap( params => {
            console.log("~ params", params)
            return of(params['searchTerm']);
        })
      )
      .subscribe( resp => {
        console.log("Recibiendo el término de búsqueda: "+resp);
      })
  }

}
