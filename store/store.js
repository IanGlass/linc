import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import productsReducer from './reducers/products';
import cartReducer from './reducers/cart';
import OrdersReducer from './reducers/orders';

const store = createStore(combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: OrdersReducer
}), composeWithDevTools());

export default store;
