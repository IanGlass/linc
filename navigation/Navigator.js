
import React from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import ProductsScreen from '../screens/ProductsScreen';

const MainNavigator = createStackNavigator({
  Products: ProductsScreen
});

export default createAppContainer(MainNavigator);