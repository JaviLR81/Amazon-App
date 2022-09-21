import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/shared/interfaces/product.interface';

export const isLookingProducts    = createAction('[User] Is Looking Products', props<{isLookingProducts: boolean}>());
export const loadProductById      = createAction('[User] Load Product By ID',  props<{id: number}>());
export const loadProductByIdStore = createAction('[User] Load Product Store',  props<{product: Product}>());
export const clearProductStore    = createAction('[User] Clear Product Store');
export const setNewSearchBar      = createAction('[Search Bar] Set New Search Bar', props<{search: string}>());

