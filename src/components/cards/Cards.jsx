import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faShare,
  faStar,
  faIndianRupee,
} from "@fortawesome/free-solid-svg-icons";
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
}) {
  return (
    <motion.div
      layout
      className={`product-card --verticle-flex ${
        inStockQuantity <= 0 ? "--out-of-stock" : ""
      }`}
    >
      <div className="card-thumbnail-container carousel">
        <div className="thumbnail-overlay --verticle-flex --has-padding">
          <button className="btn --icon-btn">
            <FontAwesomeIcon icon={faHeart} />
          </button>
          <div className="card-rating-share-btn-container --horizontal-flex">
            <div className="product-rating --bold-500">
              <FontAwesomeIcon icon={faStar} /> <span>{rating}</span>
            </div>
            <button className="btn --icon-btn">
              <FontAwesomeIcon icon={faShare} />
            </button>
          </div>
        </div>
        <img src={imgSrc} alt={imgAlt} />
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
          <button className="btn --secondary-btn --small-text">
            Add to cart
          </button>
          <button className="btn --primary-btn --has-hover-overlay --small-text">
            Buy now
          </button>
        </div>
      </div>
    </motion.div>
  );
}
