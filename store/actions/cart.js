export const addToCart = (product) => ({
  type: 'ADD_TO_CART',
  product
});

export const removeFromCart = (id) => ({
  type: 'REMOVE_FROM_CART',
  id
});