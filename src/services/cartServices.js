import axios from "axios";

const cartAxiosInstance = axios.create({
  baseURL: "https://b-brewed-store.vercel.app/api/cart",
  headers: {
    "auth-token": localStorage.getItem("auth-token"),
  },
});

const wishlistAxiosInstance = axios.create({
  baseURL: "https://b-brewed-store.vercel.app/api/wishlist",
  headers: {
    "auth-token": localStorage.getItem("auth-token"),
  },
});

export async function GetCart(cartSetter) {
  if (!localStorage.getItem("logged-in")) return cartSetter([]);
  try {
    const res = await cartAxiosInstance.get("");
    if (Array.isArray(res.data)) {
      cartSetter(res.data);
    }
  } catch (err) {
    console.log(err);
  }
}

export async function AddToCart(cartSetter, productID) {
  try {
    const res = await cartAxiosInstance.put("/add", { productID });
    if (Array.isArray(res.data)) {
      cartSetter(res.data);
    }
  } catch (err) {
    console.log(err);
  }
}

export async function DeleteFromCart(cartSetter, productID) {
  try {
    const res = await cartAxiosInstance.put("/delete", { productID });
    if (Array.isArray(res.data)) {
      cartSetter(res.data);
    }
  } catch (err) {
    console.log(err);
  }
}

export async function MoveToWishlist(cartSetter, wishlistSetter, productID) {
  try {
    const [res1, res2] = await axios.all([
      cartAxiosInstance.put("/delete", { productID }),
      wishlistAxiosInstance.put("/add", { productID }),
    ]);
    console.log("done");
    if (Array.isArray(res1.data)) {
      cartSetter(res1.data);
    }
    if (Array.isArray(res2.data)) {
      wishlistSetter(res2.data);
    }
    console.log(res1);
    console.lof(res2);
  } catch (err) {
    console.log(err);
  }
}
