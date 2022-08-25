import { createReducer, on } from '@ngrx/store';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { product } from 'src/app/testing/product-mock';
import * as actions from '../actions';

export interface UserState {
    isLookingProducts: boolean;
    product: Product
}

export const userInitialState: UserState = {
   isLookingProducts: false,
   product: null as any
}

export const userReducer = createReducer(userInitialState,
    on(actions.isLookingProducts,   (state, {isLookingProducts}) => ({ ...state, isLookingProducts: isLookingProducts })),
    on(actions.loadProductById,     (state, {id})                => ({ ...state, product: {id: id} as any })),
    on(actions.loadProductByIdStore,(state, {product})           => ({ ...state, product: {...product}})),
    on(actions.clearProductStore,   (state)                      => ({ ...state, product: null as any})),
);
