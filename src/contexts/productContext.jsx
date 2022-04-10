import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

import skuHandler from "../helpers/skuHandler";
import extractBrands from "../helpers/extractBrands";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [allProducts, setAllProducts] = useState([]);
  const [allBrands, setAllBrands] = useState([]);

  useEffect(() => {
    let isSubscriptionCancelled = false;
    (async () => {
      try {
        const res = await axios.get(
          "https://b-brewed-store.vercel.app/api/all-products"
        );
        if (Array.isArray(res.data) && !res.data.length) return;
        if (isSubscriptionCancelled) return;
        setAllProducts(() => skuHandler(res.data));
        setAllBrands(() => extractBrands(res.data));
      } catch (err) {
        console.log(err);
      }
    })();
    return () => {
      isSubscriptionCancelled = true;
    };
  }, []);

  return (
    <ProductContext.Provider value={{ allProducts, allBrands, setAllProducts }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  return useContext(ProductContext);
}
