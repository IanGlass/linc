import _ from 'lodash';
import CartItem from '../../models/cart-item';

const initialState = {
  items: {},
  totalAmount: 0
};

const cartReducer = (state = initialState, action) => {
  const items = state.items;
  switch (action.type) {
    case 'ADD_TO_CART':
      const { id, price, title } = action.product;

      if (items[id]) {
        items[id] = new CartItem(
          items[id].quantity = items[id].quantity + 1,
          price,
          title,
          items[id].quantity * price
        );
      } else {
        items[id] = new CartItem(1, price, title, price);
      }

      return {
        ...state,
        items,
        totalAmount: state.totalAmount + price
      }

    case 'REMOVE_FROM_CART':
      const product = items[action.id];

      if (!product || product.quantity < 2) {
        delete items[action.id]
      } else {
        items[action.id].quantity = items[action.id].quantity - 1;
        items[action.id].sum = items[action.id].quantity * items[action.id].productPrice;
      }

      return {
        ...state,
        items,
        totalAmount: state.totalAmount - product.productPrice
      }

    default:
      return state;
  };
};

export default cartReducer;
