import { Link, useNavigate } from "react-router-dom";

import "./css/wishlistStyle.css";
import { useWishlist } from "../../contexts/wishlistContext";
import { useCart } from "../../contexts/cartContext";
import { useProduct } from "../../contexts/productContext";
import { ProductCard } from "../cards/Cards";
import ProductListingSection from "../productListingSection/ProductListingSection";
import { DeleteFromWishlist } from "../../services/wishlistServices";
import { AddToCart } from "../../services/cartServices";

export default function Wishlist() {
  const { wishlist, setWishlist } = useWishlist();
  const { cart, setCart } = useCart();
  const { allProducts } = useProduct();
  const navigate = useNavigate();

  return (
    <main>
      <div>
        <h2 className="sub-heading wishlist-heading --h2">Wishlist</h2>
      </div>
      <ProductListingSection>
        {Array.isArray(wishlist) &&
          !!wishlist.length &&
          wishlist.map((id) => {
            const product = allProducts.find((item) => item._id === id);
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
                key={`wishlist-${product.name}`}
                productID={product._id}
                isInWishlist={true}
                wishlistSetter={setWishlist}
                wishlistClickHandler={DeleteFromWishlist}
                isInCart={isInCart}
                cartSetter={setCart}
                cartClickHandler={
                  isInCart ? () => navigate("/cart") : AddToCart
                }
              />
            );
          })}
      </ProductListingSection>
      <div className="add-more-product-btn-container">
        <Link to="/all-products">
          <button className="btn --primary-btn --has-hover-overlay">
            Add more products
          </button>
        </Link>
      </div>
    </main>
  );
}
