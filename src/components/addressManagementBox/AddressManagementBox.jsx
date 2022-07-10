import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Address from "../address/Address";
import NewAddressInput from "../newAddressInput/NewAddressInput";
import "./css/style.css";

export default function AddressManagementBox({ closeBtnHandler }) {
  return (
    <div className="address-box --verticle-flex">
      <button
        className="address-box-close-btn btn --icon-only-btn"
        onClick={() => closeBtnHandler()}
      >
        <FontAwesomeIcon icon={faClose} />
      </button>
      <div className="--verticle-flex --has-gap">
        <h3 className="--centered-text">Add new address</h3>
        <NewAddressInput />
      </div>
      <div className="--verticle-flex --has-gap">
        <h3 className="--centered-text">Saved addresses</h3>
        {false ? (
          [1, 2, 3].map(() => (
            <Address
              name="Prashant Kumar"
              phoneNumber={9973389193}
              country="India"
              firstLineAddress="Somewhere is a coue ajoosba is cool"
              lastLineAddress="B22 is aco mon cure"
              city="Kolkata"
              state="West Bengal"
              zipCode={283910}
            />
          ))
        ) : (
          <p className="--bold-700 --centered-text --opacity-half">
            You have no saved address here.
          </p>
        )}
      </div>
    </div>
  );
}
