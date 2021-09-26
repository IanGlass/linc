import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProductCard = ({ title, uri }) => {
  return (
    <View style={styles.card}>
      <Text>{title}</Text>
      <Image
        style={styles.image}
        source={{ uri }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    
  },
  image: {
    width: 66,
    height: 66
  }
})

export default ProductCard;
