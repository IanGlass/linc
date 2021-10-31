import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';
import { HeaderBackButton } from '@react-navigation/stack';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import _ from 'lodash';
import { createProduct, updateProduct } from '../../store/actions/products';

const EditProductScreen = ({ navigation, route, userProducts, createProduct, updateProduct }) => {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const product = _.find(userProducts, (product) => product.id === _.get(route, 'params.productId'));

  useEffect(() => {
    setTitle(_.get(product, 'title', ''));
    setImageUrl(_.get(product, 'imageUrl', ''));
    setPrice(_.get(product, 'price', ''));
    setDescription(_.get(product, 'description', ''));
  }, [product]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: product ? `Edit ${product.title}` : 'Create New Product',
      headerRight: (props) => (
        <HeaderBackButton
          onPress={() => {
            if (product) {
              updateProduct({
                id: product.id,
                title,
                imageUrl,
                description
              });
            } else {
              createProduct({
                title,
                imageUrl,
                price,
                description
              });
            }
            navigation.navigate('UserProducts');
          }}
          backImage={() => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
              size={23}
              color={Platform.OS === 'android' ? 'white' : Colors.primary}
            />
          )}
        />
      )
    });
  }, [title, imageUrl, price, description]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={(value) => setTitle(value)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={(value) => setImageUrl(value)}
          />
        </View>
        {!_.get(product, 'price') && <View style={styles.formControl}>
          <Text style={styles.label}>Price</Text>
          <TextInput
            style={styles.input}
            value={price.toString()}
            onChangeText={(value) => setPrice(parseInt(value))}
          />
        </View>}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={(value) => setDescription(value)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  formControl: {
    width: '100%'
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 8
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  }
});

const mapStateToProps = state => ({
  userProducts: state.products.userProducts
});

const mapDispatchToProps = dispatch => ({
  createProduct: ({ title, imageUrl, price, description }) => dispatch(createProduct({ title, imageUrl, price, description })),
  updateProduct: ({ id, title, imageUrl, description }) => dispatch(updateProduct({ id, title, imageUrl, description }))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProductScreen);


