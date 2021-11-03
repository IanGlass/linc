import React, { useEffect, useState, useReducer } from 'react';
import { connect } from 'react-redux';
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView
} from 'react-native';
import { HeaderBackButton } from '@react-navigation/stack';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Input from '../../components/UI/Input';

import Colors from '../../constants/Colors';

import _ from 'lodash';
import { createProduct, updateProduct } from '../../store/actions/products';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE':
      return {
        ...state,
        inputValues: {
          ...state.inputValues,
          [action.key]: action.value
        },
        inputValidities: {
          ...state.inputValidities,
          [action.key]: action.validity
        },
        formIsValid: _.reduce(state.inputValidities, (memo, validity) => memo && validity, true)
      }

    default:
      return state;
  }
}

const EditProductScreen = ({
  navigation,
  route,
  userProducts,
  createProduct,
  updateProduct
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const product = _.find(userProducts, (product) => product.id === _.get(route, 'params.productId'));

  const [formState, dispatch] = useReducer(formReducer, {
    inputValues: {
      title: product ? product.title : '',
      imageUrl: product ? product.imageUrl : '',
      price: '',
      description: product ? product.description : ''
    },
    inputValidities: {
      title: product ? true : false,
      imageUrl: product ? true : false,
      price: product ? true : false,
      description: product ? true : false
    },
    formIsValid: product ? true : false
  });

  useEffect(() => {
    navigation.setOptions({
      headerTitle: product ? `Edit ${product.title}` : 'Create New Product',
      headerRight: (props) => (
        <HeaderBackButton
          onPress={() => {
            if (product) {
              setLoading(true);
              updateProduct({
                id: product.id,
                title: formState.inputValues.title,
                imageUrl: formState.inputValues.imageUrl,
                description: formState.inputValues.description
              })
                .then(() => {
                  setLoading(false);
                  navigation.navigate('UserProducts');
                })
                .catch((error) => {
                  setLoading(false);
                  setError(error.message);
                })
            } else {
              if (!formState.formIsValid) {
                Alert.alert(
                  'Invalid Input',
                  'Please check the inputs',
                  [
                    {
                      text: 'OK'
                    }
                  ]);
                return;
              }
              setLoading(true);
              createProduct({
                title: formState.inputValues.title,
                imageUrl: formState.inputValues.imageUrl,
                price: formState.inputValues.price,
                description: formState.inputValues.description
              })
                .then(() => {
                  setLoading(false);
                  navigation.navigate('UserProducts');
                })
                .catch((error) => {
                  setLoading(false);
                  setError(error.message);
                })
            }
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
  }, [formState.inputValues]);

  useEffect(() => {
    if (error) {
      Alert.alert(
        'An error occurred',
        error.message,
        [
          {
            text: ' OK',
            onPress: () => setError(null)
          }
        ]
      )
    }
  }, [error])

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator
          style={styles.loader}
          size="large"
          color={Colors.primary}
        />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={5}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            value={formState.inputValues.title}
            onChangeText={(value) => dispatch({
              type: 'UPDATE',
              value,
              key: 'title',
              validity: value.trim() ? true : false
            })}
            label='Title'
            isValid={formState.inputValidities.title}
            autoCapitalize='sentences'
            autoCorrect
          />

          <Input
            value={formState.inputValues.imageUrl}
            onChangeText={(value) => dispatch({
              type: 'UPDATE',
              value,
              key: 'imageUrl',
              validity: value.trim() ? true : false
            })}
            label='Image URL'
            isValid={formState.inputValidities.imageUrl}
            returnKeyType='next'
          />

          {!_.get(product, 'price') &&
            <Input
              value={formState.inputValues.price.toString()}
              onChangeText={(value) => dispatch({
                type: 'UPDATE',
                value: parseInt(value),
                key: 'price',
                validity: value > 0 ? true : false
              })}
              label='Price'
              isValid={formState.inputValidities.price}
              keyboardType='decimal-pad'
              returnKeyType='next'
            />
          }
          <Input
            value={formState.inputValues.description}
            onChangeText={(value) => dispatch({
              type: 'UPDATE',
              value,
              key: 'description',
              validity: value.trim() ? true : false
            })}
            label='Description'
            multiline
            isValid={formState.inputValidities.description}
            numberOfLines={3}
            returnKeyType='next'
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20
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
  userProducts: state.products.userProducts
});

const mapDispatchToProps = dispatch => ({
  createProduct: ({ title, imageUrl, price, description }) => dispatch(createProduct({ title, imageUrl, price, description })),
  updateProduct: ({ id, title, imageUrl, description }) => dispatch(updateProduct({ id, title, imageUrl, description }))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProductScreen);


