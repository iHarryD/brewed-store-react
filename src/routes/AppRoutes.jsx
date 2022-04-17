import { Routes, Route, useLocation } from "react-router-dom";

import LandingPage from "../pages/landingPage/LandingPage";
import ProductListing from "../pages/productListingPage/ProductListingPage";
import Wishlist from "../pages/wishlist/Wishlist";
import Cart from "../pages/cart/Cart";
import LoginPage from "../pages/loginPage/LoginPage";
import SignupPage from "../pages/signupPage/SignupPage";
import { AnimatePresence } from "framer-motion";

export default function AppRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="all-products" element={<ProductListing />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="cart" element={<Cart />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
      </Routes>
    </AnimatePresence>
  );
}
