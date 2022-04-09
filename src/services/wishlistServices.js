import axios from "axios";

const wishlistAxiosInstance = axios.create({
  baseURL: "http://127.0.0.1:3001/api/wishlist",
  headers: {
    "auth-token": localStorage.getItem("auth-token"),
  },
});

export async function GetWishlist(wishlistSetter) {
  if (!localStorage.getItem("logged-in")) return wishlistSetter([]);
  try {
    const res = await wishlistAxiosInstance.get("");
    if (Array.isArray(res.data)) {
      wishlistSetter(res.data);
    }
  } catch (err) {
    console.log(err);
  }
}

export async function AddToWishlist(wishlistSetter, productID) {
  try {
    const res = await wishlistAxiosInstance.put("/add", { productID });
    if (Array.isArray(res.data)) {
      wishlistSetter(res.data);
    }
  } catch (err) {
    console.log(err);
  }
}

export async function DeleteFromWishlist(wishlistSetter, productID) {
  try {
    const res = await wishlistAxiosInstance.put("/delete", { productID });
    if (Array.isArray(res.data)) {
      wishlistSetter(res.data);
    }
  } catch (err) {
    console.log(err);
  }
}
