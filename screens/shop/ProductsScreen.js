// Shows all products and allows us to add to cart and show details
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  View,
  FlatList,
  Button,
  StyleSheet
} from 'react-native';

import ProductCard from '../../components/shop/ProductCard';

import { addToCart } from '../../store/actions/cart';
import { fetchProducts } from '../../store/actions/products';

import Colors from '../../constants/Colors';

const ProductsScreen = ({ navigation, products, addToCart, fetchProducts }) => {
  useEffect(() => {
    fetchProducts()
  }, []);

  return (
    <View style={{ height: '100%' }}>
      <View style={styles.list}>
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <ProductCard
              onSelect={() => navigation.navigate('ProductDetails', { productId: item.id })}
              title={item.title}
              uri={item.imageUrl}
              price={item.price}
            >
              <Button
                color={Colors.primary}
                onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
                title="View Details"
              />
              <Button
                color={Colors.primary}
                onPress={() => addToCart(item)}
                title="To Cart"
              />
            </ProductCard>
          )}
          keyExtractor={(product) => product.id}
          style={{ width: '100%' }}
        />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  }
});

const mapStateToProps = state => ({
  products: state.products.availableProducts
});

const mapDispatchToProps = dispatch => ({
  addToCart: (product) => dispatch(addToCart(product)),
  fetchProducts: () => dispatch(fetchProducts())
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsScreen);
