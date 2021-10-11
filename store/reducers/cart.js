import _ from 'lodash';
import CartItem from '../../models/cart-item';

const initialState = {
  items: {},
  sum: 0
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const { id, price, title } = action.product;
      const items = state.items;

      if (items[id]) {
        items[id] = new CartItem(
          items[id].quantity = items[id].quantity + 1,
          price,
          title,
          items[id].sum + price
        );
      } else {
        items[id] = new CartItem(1, price, title, price);
      }

      return {
        ...state,
        items,
        sum: state.sum + price
      }

    default:
      return state;
  };
};

export default cartReducer;
