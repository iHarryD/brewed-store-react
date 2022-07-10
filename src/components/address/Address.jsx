import "./css/style.css";

export default function Address({
  name,
  phoneNumber,
  firstLineAddress,
  lastLineAddress,
  city,
  state,
  zipCode,
  country,
}) {
  return (
    <div className="address-container --has-padding">
      <div className="--horizontal-flex --has-gap">
        <span className="--bold-600">{name}</span>
        <span>{phoneNumber}</span>
      </div>
      <div>
        <div>
          <p>{firstLineAddress}</p>
          <p>{lastLineAddress}</p>
        </div>
        <div>
          <span>{city}</span>, <span>{state}</span>, <span>{country}</span>
          <p>{zipCode}</p>
        </div>
      </div>
    </div>
  );
}
