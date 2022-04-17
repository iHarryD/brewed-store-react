import { createContext, useState, useContext, useEffect } from "react";

import { useAuth } from "./authContext";
import { getCart } from "../services/cartServices";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const { isLoggedIn } = useAuth();

  useEffect(() => getCart(setCart), [isLoggedIn]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
