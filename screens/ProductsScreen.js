// Shows all products and allows us to add to cart and show details
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

import ProductCard from '../components/ProductCard';

import PRODUCTS from '../data/dummy-data';

const ProductsScreen = () => {
  return (
    <View style={{ height: '100%' }}>
      <Text>Some products</Text>
      <View style={styles.list}>
        <FlatList
          data={PRODUCTS}
          renderItem={({ item }) => (<ProductCard title={item.title} uri={item.imageUrl} />)}
          keyExtractor={(product) => product.id}
          style={{ width: '100%' }}
        />
      </View>
    </View>
  )
};

ProductsScreen.navigationOptions = (navigationData) => ({
  headerTitle: 'Shop'
});

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  }
});

export default ProductsScreen;
