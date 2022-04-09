import { ButtonLoader } from "../loaders/Loaders";
import "./css/buttonsStyle.css";

export function ButtonWithLoader({ loading, text, loaderColor, clickHandler }) {
  return (
    <button
      className={`btn btn-with-loader --primary-btn --has-hover-overlay ${
        loading ? "--is-loading" : ""
      }`}
      onClick={() => clickHandler()}
    >
      {loading ? <ButtonLoader color={loaderColor} /> : text}
    </button>
  );
}
