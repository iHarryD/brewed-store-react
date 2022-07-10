import "./css/style.css";

export default function NewAddressInput() {
  return (
    <div className="--verticle-flex --has-gap">
      <div className="multiple-input-column --horizontal-flex --has-gap">
        <div className="input-label-container">
          <label htmlFor="name">Name</label>
          <input name="name" id="name" className="input" />
        </div>
        <div className="input-label-container">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input name="phoneNumber" id="phoneNumber" className="input" />
        </div>
        <div className="input-label-container">
          <label htmlFor="alternatePhoneNumber">Alternate Phone Number</label>
          <input
            name="alternatePhoneNumber"
            id="alternatePhoneNumber"
            className="input"
          />
        </div>
      </div>
      <div className="input-label-container">
        <label htmlFor="addressFirstLine">Address First Line</label>
        <input
          name="addressFirstLine"
          id="addressFirstLine"
          className="input"
        />
      </div>
      <div className="input-label-container">
        <label htmlFor="addressLastLine">Address Last Line</label>
        <input name="addressLastLine" id="addressLastLine" className="input" />
      </div>
      <div className="multiple-input-column --horizontal-flex --has-gap">
        <div className="input-label-container">
          <label htmlFor="city">City</label>
          <input name="city" id="city" className="input" />
        </div>
        <div className="input-label-container">
          <label htmlFor="state">State</label>
          <input name="state" id="state" className="input" />
        </div>
        <div className="input-label-container">
          <label htmlFor="zipCode">Zip Code</label>
          <input name="zipCode" id="zipCode" className="input" />
        </div>
      </div>
      <button className="btn --primary-btn --has-hover-overlay">Add</button>
    </div>
  );
}
