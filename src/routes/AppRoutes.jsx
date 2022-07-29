import { Routes, Route, useLocation } from "react-router-dom";

import LandingPage from "../pages/landingPage/LandingPage";
import ProductListing from "../pages/productListingPage/ProductListingPage";
import Wishlist from "../pages/wishlist/Wishlist";
import Cart from "../pages/cart/Cart";
import LoginPage from "../pages/loginPage/LoginPage";
import SignupPage from "../pages/signupPage/SignupPage";
import { AnimatePresence } from "framer-motion";
import { PrivateRoute } from "../components/privateRoute/PrivateRoute";
import { useAuth } from "../contexts/authContext";

export default function AppRoutes() {
  const location = useLocation();
  const {
    isLoggedIn: { status },
  } = useAuth();
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="all-products" element={<ProductListing />} />
        <Route
          path="wishlist"
          element={<PrivateRoute children={<Wishlist />} />}
        />
        <Route path="cart" element={<PrivateRoute children={<Cart />} />} />
        <Route
          path="login"
          element={
            <PrivateRoute children={<LoginPage />} isAuthenticated={!status} />
          }
        />
        <Route
          path="signup"
          element={
            <PrivateRoute children={<SignupPage />} isAuthenticated={!status} />
          }
        />
      </Routes>
    </AnimatePresence>
  );
}
