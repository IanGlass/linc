import _ from 'lodash';
import Product from '../../models/product';

export const fetchProducts = () => {
  return async (dispatch) => {
    const response = await fetch(
      'https://linc-dc207-default-rtdb.firebaseio.com/products.json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    const data = await response.json();

    dispatch({
      type: 'SET_PRODUCTS',
      products: _.map(data, (product, id) => new Product(
        id,
        'u1',
        product.imageUrl,
        product.title,
        product.description,
        product.price
      ))
    });
  };
};

export const deleteProduct = (id) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://linc-dc207-default-rtdb.firebaseio.com/products/${id}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    dispatch({
      type: 'DELETE_PRODUCT',
      id
    });
  };
};

export const createProduct = ({ title, imageUrl, price, description }) => {
  return async (dispatch) => {
    const response = await fetch(
      'https://linc-dc207-default-rtdb.firebaseio.com/products.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        imageUrl,
        price,
        description
      })
    });

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    const data = await response.json();

    dispatch({
      type: 'CREATE_PRODUCT',
      id: data.name,
      title,
      imageUrl,
      price,
      description
    });
  };
};

export const updateProduct = ({ id, title, imageUrl, description }) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://linc-dc207-default-rtdb.firebaseio.com/products/${id}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        imageUrl,
        description
      })
    });

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    dispatch({
      type: 'UPDATE_PRODUCT',
      pid: id,
      title,
      imageUrl,
      description
    });
  };
};