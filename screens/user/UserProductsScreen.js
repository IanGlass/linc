import React from 'react';
import { connect } from 'react-redux';
import { FlatList, Button } from 'react-native';

import ProductCard from '../../components/shop/ProductCard';

import { deleteProduct } from '../../store/actions/products';

import Colors from '../../constants/Colors';

const UserProductsScreen = ({ userProducts, deleteProduct }) => {

  return (
    <FlatList
      data={userProducts}
      renderItem={({ item }) => (
        <ProductCard
          uri={item.imageUrl}
          title={item.title}
          price={item.price}
          onSelect={() => { }}
        >
          <Button
            color={Colors.primary}
            title="Edit"
          />
          <Button
            color={Colors.primary}
            onPress={() => deleteProduct(item.id)}
            title="Delete"
          />
        </ProductCard>
      )}
    />
  );
};

const mapStateToProps = state => ({
  userProducts: state.products.userProducts
});

const mapDispatchToProps = dispatch => ({
  deleteProduct: (id) => dispatch(deleteProduct(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProductsScreen);
