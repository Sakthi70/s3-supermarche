"use client";

import { productsInCart } from "actions/products";
import { useSession } from "next-auth/react";
import { createContext, useEffect, useMemo, useReducer } from "react";
// =================================================================================

// =================================================================================
const INITIAL_CART = [];
const INITIAL_STATE = {
  user: null,
  cart: INITIAL_CART,
};
// ==============================================================

// ==============================================================
export const CartContext = createContext({});



const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_CART_AMOUNT":
      let cartList = state.cart;
      let cartItem = action.payload;
      let exist = cartList.find((item) => item.id === cartItem.id);

      if (cartItem.qty < 1) {
        const filteredCart = cartList.filter((item) => item.id !== cartItem.id);
        localStorage.setItem(state.user?.id, JSON.stringify(filteredCart));
        return { ...state, cart: filteredCart };
      }
      // IF PRODUCT ALREADY EXITS IN CART

      if (exist) {
        const newCart = cartList.map((item) =>
          item.id === cartItem.id ? { ...item, qty: cartItem.qty } : item
        );
        localStorage.setItem(state.user?.id, JSON.stringify(newCart) );
        return { ...state, cart: newCart };
      }
      localStorage.setItem(state.user?.id, JSON.stringify([...cartList, cartItem]) );
      return { ...state, cart: [...cartList, cartItem] };
    case "REINITIALIZE":
       return action.payload
    default: {
      return state;
    }
  }
  
};

export default function CartProvider({ children }) {
  const {data} =  useSession();
  useEffect(() => {
      let cart = data?.user ? localStorage.getItem(data?.user?.id) ?? "[]":"[]";
      if(data?.user){
          let cartItems = JSON.parse(cart);
          updateCartItems(cartItems);
      }else{
        dispatch({ type: "REINITIALIZE", payload:  {cart : [], user:data?.user}});
      }
  }, [data])

  const updateCartItems =async(cartItems)=>{
      await productsInCart(cartItems.map(x=> x.id)).then((products)=> {
            cartItems.forEach((element,index,object) => {
              let product = products.find(x => x.id === element.id);
              if(product && product.enabled && product.stock > 0){
                element.price = product.price;
                element.salePrice = product.salePrice;
                if(product.limit && element.qty > product.limit){
                  element.qty = product.limit;
                }
                if(element.qty > product.stock){
                  element.qty = product.stock;
                }
              }else{
                object.splice(index, 1);
              }
            });
            localStorage.setItem(state.user?.id, JSON.stringify(cartItems) );
            dispatch({ type: "REINITIALIZE", payload:  {cart : cartItems, user:data?.user}});
      })
  }
  
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch]
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}
