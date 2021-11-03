import _ from 'lodash';

import Order from '../../models/order';

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch) => {
    const date = new Date().toISOString();

    const response = await fetch(
      `https://linc-dc207-default-rtdb.firebaseio.com/orders/u1.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cartItems,
        totalAmount,
        date
      })
    });

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    const data = await response.json();

    dispatch({
      type: 'ADD_ORDER',
      id: data.name,
      date,
      cartItems,
      totalAmount
    });
  };
};

export const fetchOrders = () => {
  return async (dispatch) => {
    const response = await fetch(
      `https://linc-dc207-default-rtdb.firebaseio.com/orders/u1.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    const data = await response.json();

    dispatch({
      type: 'SET_ORDERS',
      orders: _.map(data, (order, id) => new Order(
        id,
        order.cartItems,
        order.totalAmount,
        new Date(order.date)
      ))
    });
  };
}
