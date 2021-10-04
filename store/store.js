import { createStore, combineReducers } from 'redux';

import productsReducer from './reducers/products';

const store = createStore(combineReducers({
  products: productsReducer
}));

export default store;
