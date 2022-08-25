import { ActionReducerMap } from '@ngrx/store';
import * as reducers from '../store/reducers';


export interface AppState {
   user: reducers.UserState,
   cart: reducers.CartState
}


export const appReducers: ActionReducerMap<AppState> = {
   user: reducers.userReducer,
   cart: reducers.cartReducer,
}
