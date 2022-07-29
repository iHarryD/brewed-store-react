import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faHeart,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

import "./css/headerStyle.css";
import Logo from "../../assets/logo.png";
import { useAuth } from "../../contexts/authContext";
import { useFilter } from "../../contexts/filterContext";
import { useRef } from "react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, logout } = useAuth();
  const searchInputRef = useRef(null);
  const { filterDispatch } = useFilter();
  const [isShowPurposeAlertActive, setIsShowPurposeAlertActive] =
    useState(false);
  return (
    <header>
      <nav className="navbar --horizontal-flex --centered-flex">
        <div className="navbar__logo">
          <button className="btn" onClick={() => navigate("/")}>
            <img src={Logo} alt="logo" />
          </button>
        </div>
        <div className="input-container navbar__search --horizontal-flex">
          <input ref={searchInputRef} className="input" placeholder="Search" />
          <button
            className="btn"
            onClick={() => {
              filterDispatch({
                type: "SEARCH_BY_TITLE",
                payload: { titleQuery: searchInputRef.current.value },
              });
            }}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
        <div className="icon-btn-container --horizontal-flex --centered-flex">
          <button
            className="btn --icon-btn"
            onClick={() => navigate("/wishlist")}
          >
            <FontAwesomeIcon icon={faHeart} />
          </button>
          <button className="btn --icon-btn" onClick={() => navigate("/cart")}>
            <FontAwesomeIcon icon={faCartShopping} />
          </button>
        </div>
        {isLoggedIn.status ? (
          <div className="--horizontal-flex --has-gap --centered-flex">
            <p>{`Hello, ${isLoggedIn.userName}`}</p>
            <button className="btn --secondary-btn" onClick={() => logout()}>
              Log out
            </button>
          </div>
        ) : (
          <div className="--horizontal-flex --centered-flex --has-gap">
            <button
              className="btn --primary-btn --has-hover-overlay"
              onClick={() =>
                navigate("/login", {
                  state: { previousRoute: location.pathname },
                })
              }
            >
              Log In
            </button>
            <Link to="signup">
              <button className="btn --secondary-btn">Sign Up</button>
            </Link>
          </div>
        )}
      </nav>
      <div>
        <ul className="navbar--category --horizontal-flex --bold-700">
          {[
            "Instant Coffee Powder",
            "Roasted Coffee Beans",
            "Coffee Mugs and Tumblers",
            "Coffee Machines",
            "Others",
          ].map((text) => (
            <li className="navlinks--category" key={`header-${text}`}>
              <span>{text}</span>
              <button
                className="btn --icon-btn"
                onClick={() => setIsShowPurposeAlertActive((prev) => !prev)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#000000"
                >
                  <path d="M24 24H0V0h24v24z" fill="none" opacity=".87" />
                  <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
        <AnimatePresence>
          {isShowPurposeAlertActive && (
            <motion.div
              className="show-purpose-only-alert"
              initial={{ scaleY: 0, opacity: 0, transformOrigin: "top" }}
              animate={{ scaleY: 1, opacity: 1 }}
              exit={{ scaleY: 0, opacity: 0 }}
              transition={{ type: "just" }}
            >
              This is for show purpose only.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
