import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import "./css/productListingPageStyle.css";
import { ProductCard } from "../cards/Cards";
import FilterMenu from "../filterMenu/FilterMenu";
import ProductListingSection from "../productListingSection/ProductListingSection";
import ProductListingPageLogic from "./logic/ProductListingPageLogic";
import { useWishlist } from "../../contexts/wishlistContext";
import { useCart } from "../../contexts/cartContext";
import {
  AddToWishlist,
  DeleteFromWishlist,
} from "../../services/wishlistServices";
import { AddToCart } from "../../services/cartServices";

export default function ProductListingPage() {
  const { inViewProducts, allBrands } = ProductListingPageLogic();
  const { wishlist, setWishlist } = useWishlist();
  const { cart, setCart } = useCart();
  const navigate = useNavigate();

  return (
    <>
      <main className="--horizontal-flex">
        <FilterMenu allBrands={allBrands} />
        <ProductListingSection>
          {inViewProducts.map((product) => {
            const isInWishList = wishlist.includes(product._id);
            const isInCart = cart.find(
              (item) => item.productID === product._id
            );
            return (
              <ProductCard
                title={product.name}
                currentPrice={product.currentPrice}
                mrp={product.price}
                discountPercent={product.discountPercent}
                rating={product.rating}
                imgSrc={product.img}
                imgAlt={product.name}
                inStockQuantity={product.inStockQuantity}
                key={uuidv4()}
                productID={product._id}
                isInWishlist={isInWishList}
                wishlistSetter={setWishlist}
                wishlistClickHandler={
                  isInWishList ? DeleteFromWishlist : AddToWishlist
                }
                isInCart={isInCart}
                cartSetter={setCart}
                cartClickHandler={
                  isInCart ? () => navigate("/cart") : AddToCart
                }
              />
            );
          })}
        </ProductListingSection>
      </main>
    </>
  );
}
