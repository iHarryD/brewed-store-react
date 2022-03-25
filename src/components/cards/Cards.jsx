import "./css/cardsStyle.css";

export function SuggestionCard(props) {
  return (
    <div className="suggestions-card --horizontal-flex">
      <div className="card-thumbnail-container">
        <img src={props.imgSrc} alt={props.imgAlt} />
      </div>
      <div className="card-text-container">
        <h3 className="sub-heading --h3">{props.heading}</h3>
        <p className="card-text">{props.text}</p>
        <button className="btn --secondary-btn">{props.btnText}</button>
      </div>
    </div>
  );
}

export function DealOfTheDayCard(props) {
  return (
    <div className="deal-of-the-day-card --has-hover-overlay">
      <img src={props.imgSrc} alt={props.imgAlt} />
      <div className="discount-overlay --z-index-1">{props.overlayText}</div>
    </div>
  );
}
