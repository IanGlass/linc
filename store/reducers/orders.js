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
          action.id,
          action.cartItems,
          action.totalAmount,
          action.date
        ))
      }

    case 'SET_ORDERS':
      return {
        ...state,
        orders: action.orders
      }

    default:
      return state;
  }
}