// List items and show total sum, delete item and place an order.
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const CartScreen = ({ navigation, route, cart }) => {
  return (
    <View>
      <Text>Total Sum: ${_.reduce(cart, (memo, item) => memo + item.price, 0)}</Text>
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
  cart: state.products.cart
});

const mapDispatchToProps = dispatch => ({
  removeItems: (productId) => dispatch(removeItems(productId))
});

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
