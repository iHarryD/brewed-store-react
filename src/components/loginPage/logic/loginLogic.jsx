import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/authContext";
import useServerResponse from "../../../hooks/useServerResponse";

export default function LoginLogic() {
  const [loggingIn, setLogginIn] = useState(false);
  const { serverResponse, setServerResponse } = useServerResponse();
  const { setIsLoggedIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

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
      localStorage.setItem("auth-token", res.data.token);
      localStorage.setItem("logged-in", true);
      localStorage.setItem("user-name", res.data.firstName);
      setIsLoggedIn({ status: true, userName: res.data.firstName });
      setTimeout(() => {
        if (location.state?.previousRoute === "/signup") {
          navigate("/");
        } else {
          navigate(-1);
        }
      }, 1000);
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
