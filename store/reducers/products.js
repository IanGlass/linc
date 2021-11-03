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
      const newProduct = new Product(
        action.id,
        'u1',
        action.imageUrl,
        action.title,
        action.description,
        action.price
      );

      return {
        ...state,
        availableProducts: _.concat(state.availableProducts, newProduct),
        userProducts: _.concat(state.userProducts, newProduct)
      }

    case 'UPDATE_PRODUCT':
      const userProductIndex = _.findIndex(state.userProducts, (product) => product.id === action.pid);
      const availableProductIndex = _.findIndex(state.availableProducts, (product) => product.id === action.pid);

      state.userProducts[userProductIndex].title = action.title;
      state.userProducts[userProductIndex].imageUrl = action.imageUrl;
      state.userProducts[userProductIndex].description = action.description;

      state.availableProducts[availableProductIndex].title = action.title;
      state.availableProducts[availableProductIndex].imageUrl = action.imageUrl;
      state.availableProducts[availableProductIndex].description = action.description;

      return {
        ...state,
        availableProducts: state.availableProducts,
        userProducts: state.userProducts
      }

    default:
      return state;
  }
};

export default productsReducer;