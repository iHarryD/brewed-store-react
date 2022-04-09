import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignupLogic() {
  const navigate = useNavigate();
  const [signingIn, setSigningIn] = useState(false);
  const [serverResponse, setServerResponse] = useState({
    type: null,
    text: null,
  });

  async function signup(data) {
    if (!data.firstName || !data.lastName || !data.email || !data.password)
      return setServerResponse({
        type: "error",
        text: "Kindly fill and the mandatory fields.",
      });
    if (data.password !== data.confirmPassword)
      return setServerResponse({
        type: "error",
        text: "Passwords do not match.",
      });
    setSigningIn(true);
    try {
      const res = await axios.post(
        "https://b-brewed-store.vercel.app/api/auth/signup",
        {
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          email: data.email,
          password: data.password,
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
