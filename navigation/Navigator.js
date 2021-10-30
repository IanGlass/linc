
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { HeaderBackButton } from '@react-navigation/stack';
import { Platform } from 'react-native';

import ProductsScreen from '../screens/shop/ProductsScreen';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';

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
                <Ionicons
                  name={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
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

const OrdersNavigator = ({ navigation }) => {
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
        name='Orders'
        component={OrdersScreen}
        options={{
          title: 'Your Orders',
          headerLeft: (props) => (
            <HeaderBackButton
              onPress={() => navigation.openDrawer()}
              backImage={() => (
                <Ionicons
                  name={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                  size={23}
                  color={Platform.OS === 'android' ? 'white' : Colors.primary}
                />
              )}
            />
          )
        }}
      />
    </Stack.Navigator>
  )
}

const AdminNavigator = ({ navigation }) => {
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
        name='UserProducts'
        component={UserProductsScreen}
        options={{
          title: 'Your Products',
          headerLeft: (props) => (
            <HeaderBackButton
              onPress={() => navigation.openDrawer()}
              backImage={() => (
                <Ionicons
                  name={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                  size={23}
                  color={Platform.OS === 'android' ? 'white' : Colors.primary}
                />
              )}
            />
          ),
          headerRight: (props) => (
            <HeaderBackButton
              onPress={() => navigation.navigate('EditProduct')}
              backImage={() => (
                <Ionicons
                  name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                  size={23}
                  color={Platform.OS === 'android' ? 'white' : Colors.primary}
                />
              )}
            />
          )
        }}
      />
      <Stack.Screen
        name='EditProduct'
        component={EditProductScreen}
        options={{
          title: 'Edit Product',
          headerRight: (props) => (
            <HeaderBackButton
              onPress={() => navigation.navigate('EditProduct')}
              backImage={() => (
                <Ionicons
                  name={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                  size={23}
                  color={Platform.OS === 'android' ? 'white' : Colors.primary}
                />
              )}
            />
          )
          
        }}
      />
    </Stack.Navigator>
  )
}

const MainNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name='Shop'
        component={ProductsNavigator}
        options={{
          title: 'Shop',
          drawerIcon: () => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
              size={23}
              color={Platform.OS === 'android' ? Colors.primary : 'white'}
            />
          )
        }}
      />
      <Drawer.Screen
        name='Orders'
        component={OrdersNavigator}
        options={{
          title: 'Orders',
          drawerIcon: () => <Ionicons
            name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
            size={23}
            color={Platform.OS === 'android' ? Colors.primary : 'white'}
            style={{ marginRight: 5 }}
          />
        }}
      />
      <Drawer.Screen
        name='Admin'
        component={AdminNavigator}
        options={{
          title: 'Admin',
          drawerIcon: () => <Ionicons
            name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
            size={23}
            color={Platform.OS === 'android' ? Colors.primary : 'white'}
            style={{ marginRight: 5 }}
          />
        }}
      />
    </Drawer.Navigator>
  );
};

export default MainNavigator;