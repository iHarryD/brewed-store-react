import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import "./css/loginPageStyle.css";
import { ButtonWithLoader } from "../../components/buttons/Buttons";
import LoginLogic from "./logic/loginLogic";
import { loginSignupVariant } from "../../data/loginSignupVariant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";

export default function LoginPage() {
  const testingCredentials = { email: "test@brewed.store", password: "123456" };
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isShowingPassword, setIsShowingPassword] = useState(false);
  const { login, loggingIn, serverResponse } = LoginLogic();
  return (
    <main className="main --login-signup --verticle-flex --centered-flex">
      <motion.div
        variants={loginSignupVariant}
        initial="initial"
        animate="animate"
        exit="exit"
        transition="transition"
        className="login-signup-outer-container"
      >
        <div className="login-box-container --horizontal-flex">
          <section className="section --login-with --verticle-flex --centered-flex --has-gap">
            <button className="btn --with-google --primary-btn --has-hover-overlay">
              Continue with Google
            </button>
            <button className="btn --with-apple --primary-btn --has-hover-overlay">
              Continue with Apple
            </button>
            <button className="btn --with-facebook --primary-btn --has-hover-overlay">
              Continue with Facebook
            </button>
          </section>
          <section className="section --login-box --verticle-flex --centered-flex --has-gap">
            <h3 className="sub-heading --h3">Login</h3>
            <div className="--verticle-flex --has-gap">
              <input
                className="input"
                type="text"
                name="email"
                placeholder="Email"
                ref={emailInputRef}
              />
              <div className="input-container --horizontal-flex --centered-flex">
                <input
                  className="input"
                  type={isShowingPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Password"
                  ref={passwordInputRef}
                />
                <button
                  className="show-password-btn"
                  onMouseDown={() => setIsShowingPassword(true)}
                  onMouseUp={() => setIsShowingPassword(false)}
                >
                  <FontAwesomeIcon icon={faEye} />
                </button>
              </div>
              <div>
                <button
                  className="btn --text-btn --has-hover-overlay"
                  onClick={() => {
                    emailInputRef.current.value = testingCredentials.email;
                    passwordInputRef.current.value =
                      testingCredentials.password;
                  }}
                >
                  Use testing credentials
                </button>
                <p
                  className={`response-text --small-text ${
                    serverResponse?.type ? serverResponse.type : ""
                  }`}
                >
                  {serverResponse?.text}
                </p>
                <ButtonWithLoader
                  loadingState={loggingIn}
                  text="Login"
                  loaderColor="#fff"
                  clickHandler={() => {
                    login(
                      emailInputRef.current.value,
                      passwordInputRef.current.value
                    );
                  }}
                />
              </div>
            </div>
            <div className="login-utilities-container">
              <button className="btn --text-btn">Login with OTP</button>
              <button className="btn --text-btn">Forgot password?</button>
            </div>
            <Link to="/signup" className="signup-link">
              <button className="btn --text-btn">New user? Sign up</button>
            </Link>
          </section>
        </div>
      </motion.div>
    </main>
  );
}
