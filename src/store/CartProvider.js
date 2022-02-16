import CartContext from "./cart-context"

const CartProvider = (props) => {
    const addItemToCartHandler = () =>{}
    const removeFromCartHandler = () => {}
    const cartContext = {
        items: [],
        totalAmount: 0,
        addItem: addItemToCartHandler,
        removeItem : removeFromCartHandler
    }
  return <CartContext.Provider value={cartContext}>
      {props.children}
  </CartContext.Provider>
}

export default CartProvider