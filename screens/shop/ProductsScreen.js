// Shows all products and allows us to add to cart and show details
import React from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList, StyleSheet } from 'react-native';

import ProductCard from '../../components/shop/ProductCard';

const ProductsScreen = ({ navigation, products }) => {
  return (
    <View style={{ height: '100%' }}>
      <Text>Some products</Text>
      <View style={styles.list}>
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <ProductCard
              onClickDetails={() => navigation.navigate('ProductDetails', { productId: item.id })}
              title={item.title}
              uri={item.imageUrl}
              price={item.price}
            />
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

export default connect(mapStateToProps, undefined)(ProductsScreen);
