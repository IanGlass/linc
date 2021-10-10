import React, { useEffect } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

import { addToCart } from '../../store/actions/products';

const ProductDetailsScreen = ({ navigation, route, products, addToCart }) => {
  const product = _.find(products, (product) => product.id === route.params.productId);

  useEffect(() => {
    navigation.setOptions({ headerTitle: product.title });
  }, [product]);

  return (
    <View>
      <Image
        style={styles.image}
        source={{ uri: product.imageUrl }}
      />
      <View style={styles.metaContainer}>
        <Text>${product.price}</Text>
      </View>
      <View style={styles.metaContainer}>
        <Text>{product.description}</Text>
      </View>
      <View style={styles.button}>
        <Button 
          title="Add to Cart"
          onPress={() => addToCart(product)}
           />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 5,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200
  },
  metaContainer: {
    marginVertical: 5,
    alignItems: 'center'
  }
});

const mapStateToProps = state => ({
  products: state.products.availableProducts
});

const mapDispatchToProps = dispatch => ({
  addToCart: (product) => dispatch(addToCart(product))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailsScreen);
