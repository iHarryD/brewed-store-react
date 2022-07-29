import { useRef, useState } from "react";
import { useAddress } from "../../contexts/addressContext";
import { addAddress } from "../../services/addressServices";
import { ButtonLoader } from "../loaders/Loaders";
import "./css/style.css";

export default function NewAddressInput() {
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const { setAddresses } = useAddress();
  const nameInputRef = useRef(null);
  const phoneNumberInputRef = useRef(null);
  const alternatePhoneNumberInputRef = useRef(null);
  const firstLineAddressInputRef = useRef(null);
  const lastLineAddressInputRef = useRef(null);
  const cityInputRef = useRef(null);
  const stateInputRef = useRef(null);
  const zipCodeInputRef = useRef(null);

  async function addAddressHandler() {
    const address = {
      contactName: nameInputRef.current.value,
      phoneNumber: phoneNumberInputRef.current.value,
      alternatePhoneNumber: alternatePhoneNumberInputRef.current.value,
      firstLineAddress: firstLineAddressInputRef.current.value,
      lastLineAddress: lastLineAddressInputRef.current.value,
      city: cityInputRef.current.value,
      state: stateInputRef.current.value,
      zipCode: zipCodeInputRef.current.value,
    };
    await addAddress(
      (result) => {
        setAddresses((prev) => [...prev, result.data.data]);
      },
      address,
      setIsAddingNewAddress
    );
  }

  return (
    <div className="--verticle-flex --has-gap">
      <div className="multiple-input-column --horizontal-flex --has-gap">
        <div className="input-label-container">
          <label htmlFor="name">Name</label>
          <input ref={nameInputRef} name="name" id="name" className="input" />
        </div>
        <div className="input-label-container">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            ref={phoneNumberInputRef}
            name="phoneNumber"
            id="phoneNumber"
            className="input"
          />
        </div>
        <div className="input-label-container">
          <label htmlFor="alternatePhoneNumber">Alternate Phone Number</label>
          <input
            ref={alternatePhoneNumberInputRef}
            name="alternatePhoneNumber"
            id="alternatePhoneNumber"
            className="input"
          />
        </div>
      </div>
      <div className="input-label-container">
        <label htmlFor="addressFirstLine">Address First Line</label>
        <input
          ref={firstLineAddressInputRef}
          name="addressFirstLine"
          id="addressFirstLine"
          className="input"
        />
      </div>
      <div className="input-label-container">
        <label htmlFor="addressLastLine">Address Last Line</label>
        <input
          ref={lastLineAddressInputRef}
          name="addressLastLine"
          id="addressLastLine"
          className="input"
        />
      </div>
      <div className="multiple-input-column --horizontal-flex --has-gap">
        <div className="input-label-container">
          <label htmlFor="city">City</label>
          <input ref={cityInputRef} name="city" id="city" className="input" />
        </div>
        <div className="input-label-container">
          <label htmlFor="state">State</label>
          <input
            ref={stateInputRef}
            name="state"
            id="state"
            className="input"
          />
        </div>
        <div className="input-label-container">
          <label htmlFor="zipCode">Zip Code</label>
          <input
            ref={zipCodeInputRef}
            name="zipCode"
            id="zipCode"
            className="input"
          />
        </div>
      </div>
      <button
        disabled={isAddingNewAddress}
        className="btn --primary-btn --has-hover-overlay"
        onClick={() => addAddressHandler()}
      >
        {isAddingNewAddress ? <ButtonLoader /> : "Add"}
      </button>
    </div>
  );
}
