import { ButtonLoader } from "../loaders/Loaders";
import "./css/buttonsStyle.css";

export function ButtonWithLoader({
  loadingState,
  text,
  loaderColor,
  clickHandler,
}) {
  return (
    <button
      className={`btn btn-with-loader --primary-btn --has-hover-overlay ${
        loadingState ? "--is-loading" : ""
      }`}
      onClick={() => clickHandler()}
    >
      {loadingState ? <ButtonLoader color={loaderColor} /> : text}
    </button>
  );
}
