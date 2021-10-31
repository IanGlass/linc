export const addToCart = (product) => ({
  type: 'ADD_TO_CART',
  product
});

export const deleteProduct = (id) => ({
  type: 'DELETE_PRODUCT',
  id
});

export const createProduct = ({ title, imageUrl, price, description }) => ({
  type: 'CREATE_PRODUCT',
  title,
  imageUrl,
  price,
  description
});

export const updateProduct = ({ id, title, imageUrl, description }) => ({
  type: 'UPDATE_PRODUCT',
  pid: id,
  title,
  imageUrl,
  description
});
