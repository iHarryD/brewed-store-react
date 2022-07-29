import { useNavigate } from "react-router-dom";

import "./css/productListingPageStyle.css";
import { ProductCard } from "../../components/cards/Cards";
import FilterMenu from "../../components/filterMenu/FilterMenu";
import ProductListingSection from "../../components/productListingSection/ProductListingSection";
import ProductListingPageLogic from "./logic/ProductListingPageLogic";
import { useWishlist } from "../../contexts/wishlistContext";
import { useCart } from "../../contexts/cartContext";
import {
  addToWishlist,
  deleteFromWishlist,
} from "../../services/wishlistServices";
import { addToCart } from "../../services/cartServices";

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
                key={product.name}
                productID={product._id}
                isInWishlist={isInWishList}
                wishlistSetter={setWishlist}
                wishlistClickHandler={
                  isInWishList ? deleteFromWishlist : addToWishlist
                }
                isInCart={isInCart}
                cartSetter={setCart}
                cartClickHandler={
                  isInCart ? () => navigate("/cart") : addToCart
                }
                brand={product.brand}
                isFlashDeliverable={product.flashDeliverable}
              />
            );
          })}
        </ProductListingSection>
      </main>
    </>
  );
}
