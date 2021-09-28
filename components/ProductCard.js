import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

const ProductCard = ({ title, uri }) => {
  return (
    <View style={styles.card}>
      <Image
        style={styles.image}
        source={{ uri }}
      />
      <View style={styles.detailsContainer}>
        <Button title="Details" />
        <Text style={styles.title}>{title}</Text>
        <Button title="Cart" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginVertical: 10,
    alignItems: 'center',
    elevation: 5,
    borderColor: 'black',
    height: 250,
    paddingTop: 30,
    borderRadius: 10
  },
  detailsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 15
  },
  image: {
    width: 300,
    height: 150
  },
  title: {
    width: 100
  }
})

export default ProductCard;
