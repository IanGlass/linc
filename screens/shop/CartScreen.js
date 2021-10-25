// List items and show total sum, delete item and place an order.
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

import CartItem from '../../components/shop/CartItem';

import { removeFromCart } from '../../store/actions/cart';

import Colors from '../../constants/Colors';

const CartScreen = ({ navigation, route, cart, totalAmount, removeFromCart }) => {
  const cartArray = _.map(cart, (item, key) => ({
    id: key,
    ...item
  }));

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amount}>${totalAmount.toFixed(2)}</Text>
        </Text>
        <Button
          disabled={cartArray.length === 0}
          color={Colors.accent}
          title="Order Now"
        />
      </View>
      <FlatList
        data={cartArray}
        renderItem={({ item }) => (
          <CartItem
            quantity={item.quantity}
            title={item.productTitle}
            amount={item.sum}
            onRemove={() => removeFromCart(item.id)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 20,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18
  },
  amount: {
    color: Colors.primary
  }
});

const mapStateToProps = state => ({
  cart: state.cart.items,
  totalAmount: state.cart.totalAmount
});

const mapDispatchToProps = dispatch => ({
  removeFromCart: (productId) => dispatch(removeFromCart(productId))
});

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
