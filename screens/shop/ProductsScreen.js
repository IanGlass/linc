// Shows all products and allows us to add to cart and show details
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  View,
  FlatList,
  Button,
  ActivityIndicator,
  Text,
  StyleSheet
} from 'react-native';

import ProductCard from '../../components/shop/ProductCard';

import { addToCart } from '../../store/actions/cart';
import { fetchProducts } from '../../store/actions/products';

import Colors from '../../constants/Colors';
import _ from 'lodash';

const ProductsScreen = ({ navigation, products, addToCart, fetchProducts }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadProducts = () => {
    setError('');
    setLoading(true);
    fetchProducts()
      .then(() => setLoading(false))
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      })
  }

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => loadProducts());
    return unsubscribe;
  }, [loadProducts]);

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
          onPress={() => loadProducts()}
        />
      </View>
    )
  }

  if (!loading && _.isEmpty(products)) {
    return (
      <View style={styles.screen}>
        <Text>No products found. Maybe start adding some!</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        onRefresh={() => loadProducts()}
        refreshing={loading}
        data={products}
        renderItem={
          ({ item }) => (
            <ProductCard
              onSelect={() => navigation.navigate('ProductDetails', { productId: item.id })
              }
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
  )
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
  products: state.products.availableProducts
});

const mapDispatchToProps = dispatch => ({
  addToCart: (product) => dispatch(addToCart(product)),
  fetchProducts: () => dispatch(fetchProducts())
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsScreen);
