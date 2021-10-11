import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import productsReducer from './reducers/products';
import cartReducer from './reducers/cart';

const store = createStore(combineReducers({
  products: productsReducer,
  cart: cartReducer
}), composeWithDevTools());

export default store;
