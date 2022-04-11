import axios from "axios";

export default function baseAxiosInstance() {
  return axios.create({
    baseURL: "https://b-brewed-store.vercel.app/api/auth",
  });
}
