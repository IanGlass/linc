import React from 'react';
import { connect } from 'react-redux';
import { FlatList, Button } from 'react-native';

import ProductCard from '../../components/shop/ProductCard';

import Colors from '../../constants/Colors';

const UserProductsScreen = ({ userProducts }) => {

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
            title="Delete"
          />
        </ProductCard>
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
