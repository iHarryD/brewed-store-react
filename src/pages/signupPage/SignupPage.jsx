import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import "./css/signupPageStyle.css";
import { ButtonWithLoader } from "../../components/buttons/Buttons";
import SignupLogic from "./logic/signupLogic";
import { loginSignupVariant } from "../../data/loginSignupVariant";

export default function SignupPage() {
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const emailInputRef = useRef();
  const phoneInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const { signup, signingIn, serverResponse } = SignupLogic();
  const navigate = useNavigate();
  const location = useLocation();

  function inputAnimationHandler(e) {
    e.target.value
      ? e.target.classList.add("animated")
      : e.target.classList.remove("animated");
  }

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
        <div className="signup-box --verticle-flex --has-gap">
          <form
            className="--verticle-flex"
            autoComplete="off"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="input-column">
              <div className="input-container --input-animation">
                <input
                  className="input"
                  type="text"
                  name="first-name"
                  id="first-name"
                  ref={firstNameInputRef}
                  onChange={(e) => inputAnimationHandler(e)}
                />
                <label className="label mandatory-field" htmlFor="first-name">
                  First name
                </label>
              </div>
              <div className="input-container --input-animation">
                <input
                  className="input"
                  type="text"
                  name="last-name"
                  id="last-name"
                  ref={lastNameInputRef}
                  onChange={(e) => inputAnimationHandler(e)}
                />
                <label className="label mandatory-field" htmlFor="last-name">
                  Last name
                </label>
              </div>
            </div>
            <div className="input-column">
              <div className="input-container --input-animation">
                <input
                  className="input"
                  type="email"
                  name="email"
                  id="email"
                  ref={emailInputRef}
                  onChange={(e) => inputAnimationHandler(e)}
                />
                <label className="label mandatory-field" htmlFor="email">
                  Email
                </label>
              </div>
              <div className="input-container --input-animation">
                <input
                  className="input"
                  type="text"
                  name="phone"
                  id="phone"
                  ref={phoneInputRef}
                  onChange={(e) => inputAnimationHandler(e)}
                />
                <label className="label" htmlFor="phone">
                  Phone
                </label>
              </div>
            </div>
            <div className="input-column">
              <div className="input-container --input-animation">
                <input
                  className="input"
                  type="password"
                  name="password"
                  id="set-password"
                  ref={passwordInputRef}
                  onChange={(e) => inputAnimationHandler(e)}
                />
                <label className="label mandatory-field" htmlFor="set-password">
                  Password
                </label>
              </div>
              <div className="input-container --input-animation">
                <input
                  className="input"
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  ref={confirmPasswordInputRef}
                  onChange={(e) => inputAnimationHandler(e)}
                />
                <label
                  className="label mandatory-field"
                  htmlFor="confirm-password"
                >
                  Confirm password
                </label>
              </div>
            </div>
            <div className="--verticle-flex">
              {serverResponse?.text && (
                <p
                  className={`response-text --small-text ${
                    serverResponse?.type ? serverResponse.type : ""
                  }`}
                >
                  {serverResponse.text}
                </p>
              )}
              <ButtonWithLoader
                text="Register"
                loadingState={signingIn}
                loaderColor="#fff"
                clickHandler={() =>
                  signup({
                    firstName: firstNameInputRef.current.value,
                    lastName: lastNameInputRef.current.value,
                    email: emailInputRef.current.value,
                    phone: phoneInputRef.current.value,
                    password: passwordInputRef.current.value,
                    confirmPassword: confirmPasswordInputRef.current.value,
                  })
                }
              />
            </div>
          </form>

          <button
            className="btn --text-btn"
            onClick={() =>
              navigate("/login", {
                state: { previousRoute: location.pathname },
              })
            }
          >
            Already a user? Log In
          </button>
        </div>
      </motion.div>
    </main>
  );
}
