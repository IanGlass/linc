export const addToCart = (product) => ({
  type: 'ADD_TO_CART',
  product
});

export const deleteProduct = (id) => ({
  type: 'DELETE_PRODUCT',
  id
});

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

export const updateProduct = ({ id, title, imageUrl, description }) => ({
  type: 'UPDATE_PRODUCT',
  pid: id,
  title,
  imageUrl,
  description
});
