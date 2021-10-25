import _ from 'lodash';

import Order from '../../models/order';

const initialState = {
  orders: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ORDER':
      return {
        ...state,
        orders: _.concat(state.orders, new Order(
          new Date().toString(),
          action.cartItems,
          action.totalAmount,
          new Date()
        ))
      }

    default:
      return state;
  }
}