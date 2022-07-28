import axios from "axios";

export default function wishlistAxiosInstance() {
  return axios.create({
    baseURL: "https://b-brewed-store.vercel.app/api/payments",
    headers: {
      "auth-token": localStorage.getItem("auth-token"),
    },
  });
}
