import React, { useEffect } from 'react';
import _ from 'lodash';
import { View, Text, StyleSheet } from 'react-native';

import PRODUCTS from '../data/dummy-data';

const ProductDetailsScreen = ({ navigation }) => {
  const productId = navigation.getParam('productId');

  const product = _.find(PRODUCTS, (product) => product.id === productId);

  useEffect(() => {
    navigation.setParams({ title: product.title });
  }, [product]);

  return (
    <View>
      
    </View>
    <Text>{product.title}</Text>
  );
};

ProductDetailsScreen.navigationOptions = (navigationData) => ({
  headerTitle: navigationData.navigation.getParam('title')
});

const styles = StyleSheet.create({

});

export default ProductDetailsScreen;
