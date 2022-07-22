import axios from "axios";

export default function addressAxiosInstance() {
  return axios.create({
    baseURL: "https://b-brewed-store.vercel.app/api/addresses",
    headers: {
      "auth-token": localStorage.getItem("auth-token"),
    },
  });
}
