import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Text, View, FlatList, Button, ActivityIndicator, StyleSheet } from 'react-native';

import OrderItem from '../../components/shop/OrderItem';

import { fetchOrders } from '../../store/actions/orders';

import Colors from '../../constants/Colors';

const OrdersScreen = ({ navigation, orders, fetchOrders }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);

  const loadOrders = () => {
    setLoading(true);
    fetchOrders()
      .then(() => setLoading(false))
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      })
  }

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => loadOrders());
    return unsubscribe;
  }, [loadOrders]);

  if (loading) {
    return (
      <View style={styles.screen}>
        <ActivityIndicator
          style={styles.loader}
          size="large"
          color={Colors.primary}
        />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
        <Button
          color={Colors.primary}
          title="Try Again"
          onPress={() => loadOrders()}
        />
      </View>
    )
  }

  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => (
        <OrderItem totalAmount={item.totalAmount} date={item.readableDate} items={item.items} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  screen: {
    height: '100%'
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
  orders: state.orders.orders
});

const mapDispatchToProps = dispatch => ({
  fetchOrders: () => dispatch(fetchOrders())
});

export default connect(mapStateToProps, mapDispatchToProps)(OrdersScreen);
