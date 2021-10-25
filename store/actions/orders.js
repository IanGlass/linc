export const addOrder = (cartItems, totalAmount) => ({
  type: 'ADD_ORDER',
  cartItems,
  totalAmount
});
