import wishlistAxiosInstance from "./axiosInstances/wishlistAxiosInstance";

export async function getWishlist(wishlistSetter) {
  if (!localStorage.getItem("logged-in")) return wishlistSetter([]);
  try {
    const res = await wishlistAxiosInstance().get("");
    if (Array.isArray(res.data)) {
      wishlistSetter(res.data);
    }
  } catch (err) {
    console.log(err);
  }
}

export async function addToWishlist(wishlistSetter, productID) {
  try {
    const res = await wishlistAxiosInstance().put("/add", { productID });
    if (Array.isArray(res.data)) {
      wishlistSetter(res.data);
    }
  } catch (err) {
    console.log(err);
  }
}

export async function deleteFromWishlist(wishlistSetter, productID) {
  try {
    const res = await wishlistAxiosInstance().put("/delete", { productID });
    if (Array.isArray(res.data)) {
      wishlistSetter(res.data);
    }
  } catch (err) {
    console.log(err);
  }
}
