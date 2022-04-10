import { createContext, useState, useContext, useEffect } from "react";

import { useAuth } from "./authContext";
import { GetCart } from "../services/cartServices";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const { isLoggedIn } = useAuth();

  useEffect(() => GetCart(setCart), [isLoggedIn]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
