import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as faHeartSolid,
  faShare,
  faStar,
  faIndianRupee,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { motion } from "framer-motion";

import "./css/cardsStyle.css";

export function ProductCard({
  title,
  imgSrc,
  imgAlt,
  currentPrice,
  discountPercent,
  mrp,
  rating,
  inStockQuantity,
  productID,
  isInWishlist,
  wishlistClickHandler,
  wishlistSetter,
  isInCart,
  cartClickHandler,
  cartSetter,
}) {
  const cardHoverAnimations = {
    borderRadius: "14px",
  };
  const imgHoverAnimations = {
    scale: 1.1,
  };
  const imgHoverTransition = {
    duration: 0.5,
    ease: [0.43, 0.13, 0.23, 0.96],
  };

  return (
    <motion.div
      layout
      whileHover={cardHoverAnimations}
      className={`product-card --verticle-flex ${
        inStockQuantity <= 0 ? "--out-of-stock" : ""
      }`}
    >
      <div className="card-thumbnail-container carousel">
        <div className="thumbnail-overlay --verticle-flex --has-padding">
          <button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="btn --icon-btn --z-index-1"
            onClick={() => wishlistClickHandler(wishlistSetter, productID)}
          >
            <FontAwesomeIcon
              icon={isInWishlist ? faHeartSolid : faHeartRegular}
              color="#FE251B"
            />
          </button>
          <div className="card-rating-share-btn-container --horizontal-flex  --z-index-1">
            <div className="product-rating --bold-500">
              <FontAwesomeIcon icon={faStar} /> <span>{rating}</span>
            </div>
            <button className="btn --icon-btn">
              <FontAwesomeIcon icon={faShare} />
            </button>
          </div>
        </div>
        <motion.img
          transition={imgHoverTransition}
          whileHover={imgHoverAnimations}
          src={imgSrc}
          alt={imgAlt}
        />
      </div>
      <div className="card-text-container --verticle-flex --has-padding">
        <p className="product-title --bold-500">{title}</p>
        <div>
          <span className="product-current-price --bold-700">
            <FontAwesomeIcon icon={faIndianRupee} /> {currentPrice}
          </span>
          <span className="product-discount-percent --bold-500 --small-text">
            {discountPercent}% off
          </span>
          <p className="card__mrp --opacity-half">{mrp}</p>
        </div>
        <div className="card-button-container --horizontal-flex --has-gap">
          {isInCart ? (
            <button
              className="btn --secondary-btn --small-text"
              onClick={() => cartClickHandler()}
            >
              Go to cart
            </button>
          ) : (
            <button
              className="btn --secondary-btn --small-text"
              onClick={() => cartClickHandler(cartSetter, productID)}
            >
              Add to cart
            </button>
          )}

          <button className="btn --primary-btn --has-hover-overlay --small-text">
            Buy now
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function SuggestionCard(props) {
  return (
    <div className="suggestions-card --horizontal-flex">
      <div className="card-thumbnail-container">
        <img src={props.imgSrc} alt={props.imgAlt} />
      </div>
      <div className="card-text-container">
        <h3 className="sub-heading --h3">{props.heading}</h3>
        <p className="card-text">{props.text}</p>
        <button className="btn --secondary-btn">{props.btnText}</button>
      </div>
    </div>
  );
}

export function DealOfTheDayCard(props) {
  return (
    <div className="deal-of-the-day-card --has-hover-overlay">
      <img src={props.imgSrc} alt={props.imgAlt} />
      <div className="discount-overlay --z-index-1">{props.overlayText}</div>
    </div>
  );
}

export function CartCard({
  title,
  imgSrc,
  imgAlt,
  currentPrice,
  discountPercent,
  mrp,
  productID,
  cartSetter,
  deleteFromCart,
  moveToWishlist,
  wishlistSetter,
  isInWishlist,
  wishlistBtnHandler,
  quantity,
}) {
  // const cartCardVariant = {
  //   initial: { x: 50 },
  //   final: { x: 0 },
  // };
  return (
    <motion.div
      layout
      // variants={cartCardVariant}
      // initial="initial"
      // animate="final"
      exit={{ opacity: 0, x: "-100%" }}
      className="product-card --cart-card --horizontal-flex"
    >
      <div className="card-thumbnail-container carousel">
        <img src={imgSrc} alt={imgAlt} />
      </div>
      <div className="card-text-container --verticle-flex --has-padding">
        <p className="--bold-500">{title}</p>
        <div>
          <span className="product-current-price --bold-700">
            <FontAwesomeIcon icon={faIndianRupee} /> {currentPrice}
          </span>
          <span className="product-discount-percent --small-text --bold-500">
            {discountPercent}% off
          </span>
          {/* <select className="quantity-dropdown" id="quantity">
            <option value={1}>1</option>
            <option value={2} selected>
              2
            </option>
            <option value={3}>3</option>
          </select> */}
          <p className="card__mrp --opacity-half">{mrp}</p>
        </div>
        <div className="card-button-container --horizontal-flex --has-gap --centered-flex">
          {isInWishlist ? (
            <button
              className="btn --secondary-btn --small-text"
              onClick={() => wishlistBtnHandler()}
            >
              In wishlist
            </button>
          ) : (
            <button
              className="btn --secondary-btn --small-text"
              onClick={() =>
                wishlistBtnHandler(cartSetter, wishlistSetter, productID)
              }
            >
              Move to wishlist
            </button>
          )}
        </div>
        <button
          className="btn --icon-btn delete-from-cart-btn"
          onClick={() => deleteFromCart(cartSetter, productID)}
        >
          <FontAwesomeIcon icon={faClose} />
        </button>
      </div>
    </motion.div>
  );
}
