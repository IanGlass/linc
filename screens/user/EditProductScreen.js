import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';

import _ from 'lodash';

const EditProductScreen = ({ navigation, route, userProducts }) => {
  const product = _.find(userProducts, (product) => product.id === _.get(route, 'params.productId'));

  useEffect(() => {
    if (product) {
      navigation.setOptions({ headerTitle: `Editing ${product.title}` });
    } else {
      navigation.setOptions({ headerTitle: 'Create New Product' });
    }
  }, [product]);

  return (
    <View>

    </View>
  );
};

const styles = StyleSheet.create({

});

const mapStateToProps = state => ({
  userProducts: state.products.userProducts
});

// const mapDispatchToProps = dispatch => ({
//   deleteProduct: (id) => dispatch(deleteProduct(id))
// });

export default connect(mapStateToProps, undefined)(EditProductScreen);


