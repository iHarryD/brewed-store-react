import { useNavigate, Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import "./css/cartStyle.css";
import { CartCard } from "../../components/cards/Cards";
import { useCart } from "../../contexts/cartContext";
import { useWishlist } from "../../contexts/wishlistContext";
import { deleteFromCart, moveToWishlist } from "../../services/cartServices";
import CartLogic from "./logic/CartLogic";
import AddressManagementBox from "../../components/addressManagementBox/AddressManagementBox";
import BodyBackdrop from "../../components/bodyBackdrop/BodyBackdrop";
import Address from "../../components/address/Address";

export default function Cart() {
  const navigate = useNavigate();
  const { setCart } = useCart();
  const { wishlist, setWishlist } = useWishlist();
  const {
    cartDisplay,
    cartTotalPrice,
    isAddressMenuActive,
    setIsAddressMenuActive,
  } = CartLogic();

  const cartVariant = {
    initial: { opacity: 0, x: 150 },
    final: {
      opacity: 1,
      x: 0,
      // transition: { delay: 0.2, when: "beforeChildren" },
    },
  };
  return (
    <AnimatePresence>
      {isAddressMenuActive && (
        <BodyBackdrop>
          <div className="address-management-box-container --verticle-flex --centered-flex">
            <AddressManagementBox
              closeBtnHandler={() => setIsAddressMenuActive(false)}
            />
          </div>
        </BodyBackdrop>
      )}
      <motion.main variants={cartVariant} initial="initial" animate="final">
        <h2 className="sub-heading --h2 heading--cart">Cart</h2>
        <div className="--horizontal-flex">
          <section className="section --cart --horizontal-flex --has-padding">
            {!!cartDisplay.length ? (
              <>
                <motion.div
                  layout
                  className="cart-items-container --verticle-flex --has-gap --has-padding"
                >
                  <AnimatePresence>
                    {cartDisplay.map((currentCartItem) => {
                      const isInWishlist = wishlist.find(
                        (currentItem) => currentCartItem._id === currentItem
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
                          deleteFromCart={deleteFromCart}
                          wishlistBtnHandler={
                            isInWishlist
                              ? () => navigate("/wishlist")
                              : moveToWishlist
                          }
                          wishlistSetter={setWishlist}
                          isInWishlist={isInWishlist}
                          key={`cart-${currentCartItem.name}`}
                        />
                      );
                    })}
                  </AnimatePresence>
                </motion.div>
                <aside className="aside--checkout --verticle-flex --has-padding">
                  <div>
                    <div className="heading-btn-container">
                      <h3 className="aside__heading">Selected Address</h3>
                      <button
                        className="btn --text-btn"
                        onClick={() => setIsAddressMenuActive(true)}
                      >
                        Manage
                      </button>
                    </div>
                    <div>
                      {false ? (
                        [].map(
                          ({
                            name,
                            phoneNumber,
                            firstLineAddress,
                            lastLineAddress,
                            city,
                            state,
                            zipCode,
                            country,
                          }) => (
                            <Address
                              name={name}
                              phoneNumber={phoneNumber}
                              firstLineAddress={firstLineAddress}
                              lastLineAddress={lastLineAddress}
                              city={city}
                              state={state}
                              country={country}
                              zipCode={zipCode}
                            />
                          )
                        )
                      ) : (
                        <p className="--bold-700 --centered-text --opacity-half">
                          No saved address
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="total-breakdown-container">
                    <h3 className="aside__heading">Total</h3>
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
                  <button className="btn --primary-btn --has-hover-overlay">
                    Checkout
                  </button>
                </aside>
              </>
            ) : (
              <div className="quiet-cart --verticle-flex --centered-flex --has-gap --bold-700">
                <p>Its quiet in here.</p>
                <Link to="/all-products">
                  <button className="btn --primary-btn --has-hover-overlay">
                    Add products
                  </button>
                </Link>
              </div>
            )}
          </section>
          <aside className="aside--offers --has-padding">
            <h3>Offers available</h3>
            <p>Click on the offer to avail.</p>
            <ul className="offers-list">
              <li>Up to 3% additional discount on XZ Bank credit card.</li>
              <li>
                Pay with PayPM and get a chance to win up to 100% cashback.
              </li>
              <li>10% off up to Rs 1000.</li>
              <li>Free delivery on orders above Rs 5000.</li>
            </ul>
          </aside>
        </div>
      </motion.main>
    </AnimatePresence>
  );
}
