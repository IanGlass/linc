import React, { useEffect } from 'react';
import _ from 'lodash';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

import PRODUCTS from '../data/dummy-data';

const ProductDetailsScreen = ({ navigation, route }) => {
  const product = _.find(PRODUCTS, (product) => product.id === route.params.productId);

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
        <Button title="Add to Cart" />
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

export default ProductDetailsScreen;
