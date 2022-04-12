import axios from "axios";

import cartAxiosInstance from "./axiosInstances/cartAxiosInstance";
import wishlistAxiosInstance from "./axiosInstances/wishlistAxiosInstance";

export async function getCart(cartSetter) {
  if (!localStorage.getItem("logged-in")) return cartSetter([]);
  try {
    const res = await cartAxiosInstance().get("");
    if (Array.isArray(res.data)) {
      cartSetter(res.data);
    }
  } catch (err) {
    console.log(err);
  }
}

export async function addToCart(cartSetter, productID) {
  try {
    const res = await cartAxiosInstance().put("/add", { productID });
    if (Array.isArray(res.data)) {
      cartSetter(res.data);
    }
  } catch (err) {
    console.log(err);
  }
}

export async function deleteFromCart(cartSetter, productID) {
  try {
    const res = await cartAxiosInstance().put("/delete", { productID });
    if (Array.isArray(res.data)) {
      cartSetter(res.data);
    }
  } catch (err) {
    console.log(err);
  }
}

export async function moveToWishlist(cartSetter, wishlistSetter, productID) {
  try {
    const res1 = await cartAxiosInstance().put("/delete", { productID });
    if (Array.isArray(res1.data)) {
      cartSetter(res1.data);
    }
    const res2 = await wishlistAxiosInstance().put("/add", { productID });
    if (Array.isArray(res2.data)) {
      wishlistSetter(res2.data);
    }
  } catch (err) {
    console.log(err);
  }
}

// axios.all [bug: to solve]
