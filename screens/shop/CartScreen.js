// List items and show total sum, delete item and place an order.
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const CartScreen = ({ navigation, route, cart, sum }) => {
  return (
    <View>
      <Text>Total Sum: ${sum}</Text>
      <FlatList
        data={_.uniq(cart)}
        renderItem={({item}) => (
          <Text>{item.title}</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({

});

const mapStateToProps = state => ({
  cart: state.cart.items,
  sum: state.cart.sum
});

const mapDispatchToProps = dispatch => ({
  removeItems: (productId) => dispatch(removeItems(productId))
});

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
