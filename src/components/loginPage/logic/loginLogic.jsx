import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../../contexts/authContext";

export default function LoginLogic() {
  const [loggingIn, setLogginIn] = useState(false);
  const [serverResponse, setServerResponse] = useState({
    type: null,
    text: null,
  });
  const { setIsLoggedIn } = useAuth();
  async function login(data) {
    if (!data.email || !data.password)
      return setServerResponse({
        type: "error",
        text: "Fill both fields to proceed.",
      });
    setLogginIn(true);
    try {
      const res = await axios.post(
        "https://b-brewed-store.vercel.app/api/auth/login",
        {
          email: data.email,
          password: data.password,
        }
      );
      setServerResponse({
        type: "success",
        text: res.data.message,
      });
      localStorage.setItem("encodedToken", res.data.token);
      localStorage.setItem("logged-in", true);
      localStorage.setItem("user-name", res.data.firstName);
      setIsLoggedIn({ status: true, userName: res.data.firstName });
    } catch (err) {
      setServerResponse({
        type: "error",
        text: err.response.data,
      });
    } finally {
      setLogginIn(false);
    }
  }
  return { login, loggingIn, serverResponse };
}
