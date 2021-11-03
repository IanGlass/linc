export const addOrder = (cartItems, totalAmount) => {

  return async (dispatch) => {
    const date = new Date().toISOString();

    const response = await fetch(
      `https://linc-dc207-default-rtdb.firebaseio.com/orders/u1.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cartItems,
        totalAmount,
        date
      })
    });

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    const data = await response.json();

    dispatch({
      type: 'ADD_ORDER',
      id: data.name,
      date,
      cartItems,
      totalAmount
    });
  };
};
