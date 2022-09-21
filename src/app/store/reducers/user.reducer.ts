import { createReducer, on } from '@ngrx/store';
import { Product } from '../../shared/interfaces/product.interface';
import * as actions from '../actions';

export interface UserState {
    isLookingProducts: boolean;
    product          : Product;
    searchBar        : string;
}

export const userInitialState: UserState = {
   isLookingProducts: false,
   product: null as any,
   searchBar: null as any
}

export const userReducer = createReducer(userInitialState,
    on(actions.isLookingProducts,   (state, {isLookingProducts}) => ({ ...state, isLookingProducts: isLookingProducts })),
    on(actions.loadProductById,     (state, {id})                => ({ ...state, product: {id: id} as any })),
    on(actions.loadProductByIdStore,(state, {product})           => ({ ...state, product: {...product}})),
    on(actions.clearProductStore,   (state)                      => ({ ...state, product: null as any})),
    on(actions.setNewSearchBar,     (state, {search})            => ({ ...state, searchBar: search })),
);
