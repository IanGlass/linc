// List items and show total sum, delete item and place an order.
import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { View, Text, Button, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

import CartItem from '../../components/shop/CartItem';

import { removeFromCart } from '../../store/actions/cart';
import { addOrder } from '../../store/actions/orders';

import Colors from '../../constants/Colors';

const CartScreen = ({
  cart,
  totalAmount,
  removeFromCart,
  addOrder
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cartArray = _.map(cart, (item, key) => ({
    id: key,
    ...item
  }));

  useEffect(() => {
    if (error) {
      Alert.alert(
        'An error occurred',
        error.message,
        [
          {
            text: ' OK',
            onPress: () => setError(null)
          }
        ]
      )
    }
  }, [error]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator
          style={styles.loader}
          size="large"
          color={Colors.primary}
        />
      </View>
    );
  }

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
          onPress={() => {
            setLoading(true);
            addOrder(cartArray, totalAmount)
              .then(() => {
                setLoading(false);
              })
              .catch((error) => {
                setLoading(false);
                setError(error.message);
              })
          }}
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
  },
  centered: {
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const mapStateToProps = state => ({
  cart: state.cart.items,
  totalAmount: state.cart.totalAmount
});

const mapDispatchToProps = dispatch => ({
  removeFromCart: (productId) => dispatch(removeFromCart(productId)),
  addOrder: (cartItems, totalAmount) => dispatch(addOrder(cartItems, totalAmount))
});

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
