
import React from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import ProductsScreen from '../screens/ProductsScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';

const MainNavigator = createStackNavigator({
  Products: ProductsScreen,
  ProductDetails: ProductDetailsScreen
});

export default createAppContainer(MainNavigator);