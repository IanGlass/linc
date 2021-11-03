import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import productsReducer from './reducers/products';
import cartReducer from './reducers/cart';
import OrdersReducer from './reducers/orders';

const store = createStore(combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: OrdersReducer
}), applyMiddleware(ReduxThunk));

export default store;
