
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AntDesign } from '@expo/vector-icons';
import { HeaderBackButton } from '@react-navigation/stack';

import ProductsScreen from '../screens/ProductsScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const ProductsNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProductsList"
        options={{
          title: 'Shop',
          headerLeft: (props) => (
            <HeaderBackButton
              onPress={() => navigation.openDrawer()}
              backImage={() => (
                <AntDesign
                  name='bars'
                  size={25}
                />
              )}
            />
          )
        }}
        component={ProductsScreen}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{
          title: 'Shop'
        }}
      />
    </Stack.Navigator>
  )
};

const MainNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Products"
        component={ProductsNavigator}
        options={{
          title: "Drawer",
        }}
      />
    </Drawer.Navigator>
  );
};

export default MainNavigator;