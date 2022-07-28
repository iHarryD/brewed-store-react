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
import { CheckoutAddress } from "../../components/address/Address";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupee } from "@fortawesome/free-solid-svg-icons";
import { useAddress } from "../../contexts/addressContext";
import { loadScript } from "../../helpers/loadScript";
import { createPayment } from "../../services/paymentServices";
import { useState } from "react";
import PaymentAlert from "../../components/paymentAlert/PaymentAlert";

export default function Cart() {
  const navigate = useNavigate();
  const { setCart } = useCart();
  const { wishlist, setWishlist } = useWishlist();
  const { selectedAddress } = useAddress();
  const {
    cartDisplay,
    cartTotalPrice,
    isAddressMenuActive,
    setIsAddressMenuActive,
  } = CartLogic();
  const [paymentMessage, setPaymentMessage] = useState(null);

  const cartVariant = {
    initial: { opacity: 0, x: 150 },
    final: {
      opacity: 1,
      x: 0,
    },
  };

  async function showRazorpay() {
    const loadRazorpay = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!loadRazorpay) return;
    const result = await createPayment();
    if (result.status !== 200) return;
    const paymentDetails = result.data.data;
    const options = {
      amount: paymentDetails.amount.toString(),
      currency: paymentDetails.currency,
      order_id: paymentDetails.id,
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      name: "Brewed Store",
      description: "Make the payment to confirm your order.",
      image: "https://example.com/your_logo",
      handler: function (response) {
        setPaymentMessage(
          `Payment successful for order ${response.razorpay_order_id}`
        );
      },
      prefill: {
        name: paymentDetails.name,
        email: paymentDetails.email,
      },
      theme: {
        color: "#1f1e1a",
      },
    };
    const razorpayObject = new window.Razorpay(options);
    razorpayObject.open();
    razorpayObject.on("payment.failed", function (response) {
      setPaymentMessage(
        `Payment for order ${response.error.metadata.order_id} failed. ${response.error.reason}`
      );
    });
  }

  return (
    <>
      {isAddressMenuActive && (
        <BodyBackdrop>
          <div className="modal-container --verticle-flex --centered-flex">
            <AddressManagementBox
              closeBtnHandler={() => setIsAddressMenuActive(false)}
            />
          </div>
        </BodyBackdrop>
      )}
      {paymentMessage && (
        <BodyBackdrop>
          <div className="modal-container --verticle-flex --centered-flex">
            <PaymentAlert
              closeFunc={() => setPaymentMessage(null)}
              text={paymentMessage}
            />
          </div>
        </BodyBackdrop>
      )}
      <AnimatePresence>
        <motion.main variants={cartVariant} initial="initial" animate="final">
          <h2 className="sub-heading --h2 heading--cart">Cart</h2>
          <div className="--horizontal-flex">
            <section className="section --cart --has-padding">
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
                        <h3 className="aside__heading">Deliver to</h3>
                        <button
                          className="btn --text-btn"
                          onClick={() => setIsAddressMenuActive(true)}
                        >
                          Change
                        </button>
                      </div>
                      <div>
                        {selectedAddress ? (
                          <CheckoutAddress
                            name={selectedAddress.contactName}
                            phoneNumber={selectedAddress.phoneNumber}
                            firstLineAddress={selectedAddress.firstLineAddress}
                            lastLineAddress={selectedAddress.lastLineAddress}
                            city={selectedAddress.city}
                            state={selectedAddress.state}
                            country={selectedAddress.country}
                            zipCode={selectedAddress.zipCode}
                          />
                        ) : (
                          <p className="--bold-700 --centered-text --opacity-half">
                            No address selected
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="total-breakdown-container">
                      <h3 className="aside__heading">Total</h3>
                      <p className="price-breakdown-items">
                        From cart
                        <span>
                          <span className="rs-sign-container">
                            <FontAwesomeIcon icon={faIndianRupee} />
                          </span>
                          {cartTotalPrice}
                        </span>
                      </p>
                      <p className="price-breakdown-items">
                        Delivery fee
                        <span>
                          <span className="rs-sign-container">
                            <FontAwesomeIcon icon={faIndianRupee} />
                          </span>
                          0
                        </span>
                      </p>
                      <p className="price-breakdown-items">
                        Other fee
                        <span>
                          <span className="rs-sign-container">
                            <FontAwesomeIcon icon={faIndianRupee} />
                          </span>
                          0
                        </span>
                      </p>
                      <p className="price-breakdown-items">
                        Discount from offers
                        <span>
                          <span className="rs-sign-container">
                            <FontAwesomeIcon icon={faIndianRupee} />
                          </span>
                          0
                        </span>
                      </p>
                      <p className="price-breakdown-items">
                        Total
                        <span>
                          <span className="rs-sign-container">
                            <FontAwesomeIcon icon={faIndianRupee} />
                          </span>
                          {cartTotalPrice}
                        </span>
                      </p>
                    </div>
                    <button
                      className="btn --primary-btn --has-hover-overlay"
                      disabled={!selectedAddress}
                      onClick={() => showRazorpay()}
                    >
                      {selectedAddress ? "Make payment" : "Selected an address"}
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
    </>
  );
}
