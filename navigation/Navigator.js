
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { HeaderBackButton } from '@react-navigation/stack';
import { Platform } from 'react-native';

import ProductsScreen from '../screens/shop/ProductsScreen';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen';
import CartScreen from '../screens/shop/CartScreen';

import Colors from '../constants/Colors';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const ProductsNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
        headerBackTitleStyle: {
          fontFamily: 'open-sans'
        }
      }}
    >
      <Stack.Screen
        name='ProductsList'
        options={{
          title: 'All Products',
          headerLeft: (props) => (
            <HeaderBackButton
              onPress={() => navigation.openDrawer()}
              backImage={() => (
                <AntDesign
                  name='bars'
                  size={23}
                  color={Platform.OS === 'android' ? 'white' : Colors.primary}
                />
              )}
            />
          ),
          headerRight: (props) => (
            <HeaderBackButton
              onPress={() => navigation.navigate('Cart')}
              backImage={() => (
                <Ionicons
                  name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                  size={23}
                  color={Platform.OS === 'android' ? 'white' : Colors.primary}
                  style={{ marginRight: 5 }}
                />
              )}
            />
          )
        }}
        component={ProductsScreen}
      />
      <Stack.Screen
        name='ProductDetails'
        component={ProductDetailsScreen}
        options={{
          title: 'Shop'
        }}
      />
      <Stack.Screen
        name='Cart'
        component={CartScreen}
        options={{
          title: 'Cart'
        }}
      />
    </Stack.Navigator>
  )
};

const MainNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name='Shop'
        component={ProductsNavigator}
        options={{
          title: 'Shop',
        }}
      />
    </Drawer.Navigator>
  );
};

export default MainNavigator;