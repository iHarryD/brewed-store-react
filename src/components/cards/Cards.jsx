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
