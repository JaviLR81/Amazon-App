import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/shared/interfaces/product.interface';


export const setCartItem = createAction ('[Cart] Set Cart Item', props<{cartItem: Product}>());
