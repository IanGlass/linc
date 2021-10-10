import _ from 'lodash';
import PRODUCTS from '../../data/dummy-data';

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: _.filter(PRODUCTS, (product) => product.ownerId === 'u1')
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