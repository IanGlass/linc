import React from 'react';
import { connect } from 'react-redux';
import { Text, FlatList } from 'react-native';

const OrdersScreen = ({ orders }) => {
  return (
    <FlatList
      data={orders}
      renderItem={({item}) => <Text>{item.totalAmount}</Text>}
    />
  );
};

const mapStateToProps = state => ({
  orders: state.orders
});

export default connect(mapStateToProps, undefined)(OrdersScreen);
