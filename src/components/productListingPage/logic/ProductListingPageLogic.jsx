import axios from "axios";
import { useEffect, useState } from "react";

import { useProduct } from "../../../contexts/productContext";
import { useFilter } from "../../../contexts/filterContext";
import useInView from "../../../hooks/useInView";

export default function ProductListingPageLogic() {
  const { products, setProducts } = useProduct();
  const { filter } = useFilter();
  const [allBrands, setAllBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [caughtError, setCaughtError] = useState(null);
  const { inViewProducts } = useInView(products.allProducts, filter);

  useEffect(() => {
    let isSubscriptionCancelled = false;
    (async () => {
      try {
        const res = await axios.get(
          "https://b-brewed-store.vercel.app/api/all-products"
        );
        if (Array.isArray(res.data) && !res.data.length) return;
        const updatedProducts = res.data.map((product) => {
          const num = Math.floor(Math.random() * (30 + 1) + 1);
          const toBePrice = !!product.sku.length
            ? product.sku[0].price
            : product.price;
          return {
            ...product,
            price: toBePrice,
            currentPrice: toBePrice - Math.floor((toBePrice / 100) * num),
            discountPercent: num,
          };
        });
        if (isSubscriptionCancelled) return;
        setProducts((prev) => ({ ...prev, allProducts: updatedProducts }));
        setAllBrands(() =>
          updatedProducts.reduce((acc, product) => {
            if (acc.includes(product?.brand)) return acc;
            return [...acc, product.brand];
          }, [])
        );
      } catch (err) {
        setCaughtError(err?.response?.status || 500);
      } finally {
        setIsLoading(false);
      }
    })();
    return () => {
      isSubscriptionCancelled = true;
    };
  }, []);
  return { inViewProducts, allBrands, isLoading, caughtError };
}
