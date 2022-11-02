import { createReducer, on } from '@ngrx/store';
import { Product } from 'src/app/shared/interfaces/product.interface';
import * as actions from '../actions';

export interface CartState {
    cartItems: Product[],
}

export const cartInitialState: CartState = {
   cartItems: [],
}

export const cartReducer = createReducer(cartInitialState,
    on(actions.setCartItem, (state, {cartItem}) => ({...state, cartItems: [...state.cartItems, cartItem]}) )
);

