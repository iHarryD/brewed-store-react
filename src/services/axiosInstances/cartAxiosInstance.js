import axios from "axios";

export default function cartAxiosInstance() {
  return axios.create({
    baseURL: "https://b-brewed-store.vercel.app/api/cart",
    headers: {
      "auth-token": localStorage.getItem("auth-token"),
    },
  });
}
