import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import "./css/featuresCarouselStyle.css";

export default function FeaturesCarousel(props) {
  const [inViewIndex, setInViewIndex] = useState(0);
  const carouselItemsLength = props.carouselItems.length;
  const intervalID = useRef();

  useEffect(() => {
    if (!Array.isArray(props.carouselItems) || carouselItemsLength === 0) {
      return;
    }
    intervalID.current = setInterval(() => {
      setInViewIndex((prev) =>
        prev + 1 >= carouselItemsLength ? 0 : prev + 1
      );
    }, 5000);
    return () => {
      clearInterval(intervalID.current);
    };
  }, []);

  function carouselNavBtnHandler(e) {
    clearInterval(intervalID.current);
    setInViewIndex(Number(e.target.value));
    intervalID.current = setInterval(() => {
      setInViewIndex((prev) =>
        prev + 1 >= carouselItemsLength ? 0 : prev + 1
      );
    }, 5000);
  }
  return (
    <div className="features-carousel">
      {props.carouselItems.map((item, index) => (
        <div
          className={`features-carousel-item ${
            inViewIndex === index ? "in-view" : ""
          }`}
        >
          <img src={item.imgSrc} alt={item.imgAlt} />
          <div className="features-carousel-overlay --verticle-flex">
            <h2 className="sub-heading --h2">{item.text}</h2>
            <Link to="/all-products">
              <button className="btn --primary-btn --has-hover-overlay">
                {item.btnText}
              </button>
            </Link>
          </div>
        </div>
      ))}
      <div className="features-carousel-nav --horizontal-flex --has-padding">
        {Array.from(Array(carouselItemsLength)).map((item, index) => (
          <button
            className={`btn features-carousel-nav-btn --icon-only-btn ${
              inViewIndex === index ? "in-view" : ""
            }`}
            value={index}
            onClick={(e) => carouselNavBtnHandler(e)}
          >
            <FontAwesomeIcon icon={faCircle} />
          </button>
        ))}
      </div>
    </div>
  );
}
