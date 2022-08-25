import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actions from '../actions';
import { tap, mergeMap, map, catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { ProductService } from 'src/app/product/services/product/product.service';



@Injectable()
export class UsuarioEffects {

    constructor(
        private actions$: Actions,
        private productService: ProductService
    ){}


    cargarUsuario$ = createEffect(
        () => this.actions$.pipe(
            ofType( actions.loadProductById ),
            mergeMap(
                ( action ) => this.productService.getProductDetail( action.id )
                    .pipe(
                        map( user => actions.loadProductByIdStore({ product: user }) ),
                        // TODO: Test this part
                        catchError( err =>  {
                          return of(actions.loadProductByIdStore({ product: null as any }))
                        })
                    )
            )
        )
    );

}
