import "./css/style.css";

export default function PaymentAlert({ closeFunc, text }) {
  return (
    <div className="payment-alert">
      <p>{text}</p>
      <button
        className="btn --primary-btn --has-hover-overlay"
        onClick={() => closeFunc()}
      >
        Close
      </button>
    </div>
  );
}
