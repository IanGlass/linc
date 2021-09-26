// Shows all products and allows us to add to cart and show details
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

import ProductCard from '../components/ProductCard';

import PRODUCTS from '../data/dummy-data';

const ProductsScreen = () => {
  return (
    <View>
      <Text>Some products</Text>
      <FlatList
        data={PRODUCTS}
        renderItem={({item}) => (<ProductCard title={item.title} uri={item.imageUrl} />)}
        keyExtractor={(product) => product.id}
      />
    </View>
  )
};

ProductsScreen.navigationOptions = (navigationData) => ({
  headerTitle: 'Shop'
});

const styles = StyleSheet.create({
  card: {
    
  }
});

export default ProductsScreen;
