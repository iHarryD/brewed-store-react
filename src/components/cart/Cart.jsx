import { useNavigate } from "react-router-dom";

import "./css/cartStyle.css";
import { CartCard } from "../cards/Cards";
import { useCart } from "../../contexts/cartContext";
import { useWishlist } from "../../contexts/wishlistContext";
import { DeleteFromCart, MoveToWishlist } from "../../services/cartServices";
import CartLogic from "./logic/CartLogic";

export default function Cart() {
  const navigate = useNavigate();
  const { setCart } = useCart();
  const { wishlist, setWishlist } = useWishlist();
  const { cartDisplay, cartTotalPrice } = CartLogic();
  return (
    <main>
      <h2 className="sub-heading --h2 heading--cart">Cart</h2>
      <div className="--horizontal-flex">
        <section className="section --cart --horizontal-flex">
          <div
            layout
            className="cart-items-container --verticle-flex --has-gap"
          >
            {cartDisplay.map((currentCartItem) => {
              const isInWishlist = wishlist.find(
                (currentItem) => currentCartItem.productID === currentItem
              );
              return (
                <CartCard
                  title={currentCartItem.name}
                  mrp={currentCartItem.price}
                  currentPrice={currentCartItem.currentPrice}
                  discountPercent={currentCartItem.discountPercent}
                  imgSrc={currentCartItem.img}
                  imgAlt={currentCartItem.name}
                  productID={currentCartItem._id}
                  cartSetter={setCart}
                  deleteFromCart={DeleteFromCart}
                  wishlistBtnHandler={() =>
                    isInWishlist ? navigate("/wishlist") : MoveToWishlist
                  }
                  wishlistSetter={setWishlist}
                  isInWishlist={isInWishlist}
                  key={`cart-${currentCartItem.name}`}
                />
              );
            })}
          </div>
          <aside className="aside--checkout-total --verticle-flex">
            <div className="total-breakdown-container">
              <p className="price-breakdown-items">
                From cart Rs <span>{cartTotalPrice}</span>
              </p>
              <p className="price-breakdown-items">
                Delivery fee Rs <span>0</span>
              </p>
              <p className="price-breakdown-items">
                Other fee Rs <span>0</span>
              </p>
              <p className="price-breakdown-items">
                Discount from offers Rs <span>0</span>
              </p>
              <p className="price-breakdown-items">
                Total Rs <span>{cartTotalPrice}</span>
              </p>
            </div>
            <button className="btn --primary-btn --has-hover-overlay add-address-btn">
              Add address
            </button>
          </aside>
        </section>
        <aside className="aside--offers">
          <h3>Offers available</h3>
          <p>Click on the offer to avail.</p>
          <ul className="offers-list">
            <li>Up to 3% additional discount on XZ Bank credit card.</li>
            <li>Pay with PayPM and get a chance to win up to 100% cashback.</li>
            <li>10% off up to Rs 1000.</li>
            <li>Free delivery on orders above Rs 5000.</li>
          </ul>
        </aside>
      </div>
    </main>
  );
}
