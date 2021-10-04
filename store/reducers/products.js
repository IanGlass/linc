import _ from 'lodash';
import PRODUCTS from '../../data/dummy-data';

const initialState = {
  products: PRODUCTS,
  cart: []
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        cart: _.concat(state.cart, action.product)
      }

    default:
      return state;
  }
};

export default productsReducer;