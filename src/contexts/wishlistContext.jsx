import { createContext, useState, useContext, useEffect } from "react";

import { useAuth } from "./authContext";
import { GetWishlist } from "../services/wishlistServices";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const { isLoggedIn } = useAuth();

  useEffect(() => GetWishlist(setWishlist), [isLoggedIn]);

  return (
    <WishlistContext.Provider value={{ wishlist, setWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
