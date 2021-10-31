import _ from 'lodash';

import Product from '../../models/product';
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

    case 'CREATE_PRODUCT':
      return {
        ...state,
        userProducts: _.concat(state.userProducts, new Product(
          new Date().toString(),
          'u1',
          action.imageUrl,
          action.title,
          action.description,
          action.price
        ))
      }

    case 'UPDATE_PRODUCT':
      const productIndex = _.findIndex(state.userProducts, (product) => product.id === action.pid);
      state.userProducts[productIndex].title = action.title;
      state.userProducts[productIndex].imageUrl = action.imageUrl;
      state.userProducts[productIndex].description = action.description;

      console.log(action)

      return {
        ...state,
        userProducts: state.userProducts
      }

    default:
      return state;
  }
};

export default productsReducer;