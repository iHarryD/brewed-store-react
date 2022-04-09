import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useServerResponse from "../../../hooks/useServerResponse";

export default function SignupLogic() {
  const navigate = useNavigate();
  const [signingIn, setSigningIn] = useState(false);
  const { serverResponse, setServerResponse } = useServerResponse();

  async function signup({
    firstName,
    lastName,
    email,
    phone,
    password,
    confirmPassword,
  }) {
    if (!firstName || !lastName || !email || !password)
      return setServerResponse({
        type: "error",
        text: "Kindly fill all the mandatory fields.",
      });
    if (password !== confirmPassword)
      return setServerResponse({
        type: "error",
        text: "Passwords do not match.",
      });
    setSigningIn(true);
    try {
      const res = await axios.post(
        "https://b-brewed-store.vercel.app/api/auth/signup",
        {
          firstName: firstName,
          lastName: lastName,
          phone: phone,
          email: email,
          password: password,
        }
      );
      setServerResponse({
        type: "success",
        text: res.data.message,
      });
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      setServerResponse({
        type: "error",
        text: err.response.data,
      });
    } finally {
      setSigningIn(false);
    }
  }
  return { signup, signingIn, serverResponse };
}
