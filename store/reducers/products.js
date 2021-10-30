import _ from 'lodash';
import PRODUCTS from '../../data/dummy-data';

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: _.filter(PRODUCTS, (product) => product.ownerId === 'u1')
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DELETE_PRODUCT':
      return {
        ...state,
        userProducts: _.filter(state.userProducts, (product) => product.id !== action.id)
      };

    default:
      return state;
  }
};

export default productsReducer;