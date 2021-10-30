export const addToCart = (product) => ({
  type: 'ADD_TO_CART',
  product
});

export const deleteProduct = (id) => ({
  type: 'DELETE_PRODUCT',
  id
});
