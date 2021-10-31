import React from 'react';
import { connect } from 'react-redux';
import { FlatList, Button, Alert } from 'react-native';

import ProductCard from '../../components/shop/ProductCard';

import { deleteProduct } from '../../store/actions/products';

import Colors from '../../constants/Colors';

const UserProductsScreen = ({ navigation, userProducts, deleteProduct }) => {

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
            onPress={() => navigation.navigate('EditProduct', { productId: item.id })}
            title="Edit"
          />
          <Button
            color={Colors.primary}
            onPress={() => {
              Alert.alert(
                'Delete Item',
                'Are you sure you want to delete this item?',
                [
                  {
                    text: 'No',
                    style: 'default'
                  },
                  {
                    text: 'Yes',
                    style: 'destructive',
                    onPress: () => deleteProduct(item.id)
                  }
                ])
            }}
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
