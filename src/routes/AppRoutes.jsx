import { Routes, Route } from "react-router-dom";

import LandingPage from "../components/landingPage/LandingPage";
import ProductListing from "../components/productListingPage/ProductListingPage";
import Wishlist from "../components/wishlist/Wishlist";
import Cart from "../components/cart/Cart";
import LoginPage from "../components/loginPage/LoginPage";
import SignupPage from "../components/signupPage/SignupPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="all-products" element={<ProductListing />} />
      <Route path="wishlist" element={<Wishlist />} />
      <Route path="cart" element={<Cart />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignupPage />} />
    </Routes>
  );
}
