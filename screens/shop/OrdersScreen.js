import React from 'react';
import { connect } from 'react-redux';
import { Text, FlatList } from 'react-native';

import OrderItem from '../../components/shop/OrderItem';

const OrdersScreen = ({ orders }) => {
  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => (
        <OrderItem totalAmount={item.totalAmount} date={item.readableDate} />
      )}
    />
  );
};

const mapStateToProps = state => ({
  orders: state.orders.orders
});

export default connect(mapStateToProps, undefined)(OrdersScreen);
