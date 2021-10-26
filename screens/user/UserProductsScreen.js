import React from 'react';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';

import ProductCard from '../../components/shop/ProductCard';

const UserProductsScreen = ({ userProducts }) => {

  return (
    <FlatList
      data={userProducts}
      renderItem={({ item }) => (
        <ProductCard
          uri={item.imageUrl}
          title={item.title}
          price={item.price}
          onClickDetails={() => { }}
          onAddCart={() => { }}
        />
      )}
    />
  );
};

const mapStateToProps = state => ({
  userProducts: state.products.availableProducts
});

// const mapDispatchToProps = dispatch => ({
//   addToCart: (product) => dispatch(addToCart(product))
// });

export default connect(mapStateToProps, undefined)(UserProductsScreen);
