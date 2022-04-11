import { useEffect, useState } from "react";

import { useCart } from "../../../contexts/cartContext";
import { useProduct } from "../../../contexts/productContext";

export default function CartLogic() {
  const { allProducts } = useProduct();
  const { cart } = useCart();
  const [cartTotalPrice, setCartTotalPrice] = useState();
  const [cartDisplay, setCartDisplay] = useState([]);

  useEffect(() => {
    setCartDisplay(() =>
      cart.map((currentCartItem) => {
        const product = allProducts.find(
          (currentItem) => currentCartItem.productID === currentItem._id
        );
        return product;
      })
    );
    setCartTotalPrice(
      cart.reduce((totalPrice, currentCartItem) => {
        const product = allProducts.find(
          (product) => currentCartItem.productID === product._id
        );
        return (totalPrice += product.currentPrice);
      }, 0)
    );
  }, [cart]);

  return { cartDisplay, cartTotalPrice };
}
