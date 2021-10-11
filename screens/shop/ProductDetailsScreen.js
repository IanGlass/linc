import React, { useEffect } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { View, Text, Image, Button, ScrollView, StyleSheet } from 'react-native';

import { addToCart } from '../../store/actions/cart';

import Colors from '../../constants/Colors';

const ProductDetailsScreen = ({ navigation, route, products, addToCart }) => {
  const product = _.find(products, (product) => product.id === route.params.productId);

  useEffect(() => {
    navigation.setOptions({ headerTitle: product.title });
  }, [product]);

  return (
    <ScrollView>
      <View>
        <Image
          style={styles.image}
          source={{ uri: product.imageUrl }}
        />
        <View style={styles.buttonsContainer}>
          <Button
            color={Colors.primary}
            title="Add to Cart"
            onPress={() => addToCart(product)}
          />
        </View>
        <Text style={styles.price}>${product.price}</Text>
        <Text style={styles.description}>{product.description}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300
  },
  price: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20
  },
  description: {
    fontFamily: 'open-sans-bold',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20
  },
  buttonsContainer: {
    marginVertical: 10,
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
