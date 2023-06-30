import React, { useReducer } from "react";
import CartContext from "./cart-context";

const initialState = { items: [], totalAmount: 0 };
const cartReducer = (prevState, action) => {
  let updatedItems;

  if (action.type === "ADD") {
    const updateTotalAmount =
      prevState.totalAmount + action.item.price * action.item.amount;

    const existingItemIdx = prevState.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingItem = prevState.items[existingItemIdx];

    if (existingItem) {
      let updatedItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount,
      };
      updatedItems = [...prevState.items];
      updatedItems[existingItemIdx] = updatedItem;
    } else {
      updatedItems = prevState.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updateTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const existingItemIdx = prevState.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = prevState.items[existingItemIdx];
    const updatedTotal = prevState.totalAmount - existingItem.price;
    if (existingItem.amount === 1) {
      updatedItems = prevState.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...prevState.items];
      updatedItems[existingItemIdx] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotal,
    };
  }
  if (action.type === "CLEAR") {
    return initialState;
  }

  return initialState;
};

const CartContextProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, initialState);

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
