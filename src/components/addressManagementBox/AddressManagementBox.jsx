import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAddress } from "../../contexts/addressContext";
import { Address } from "../address/Address";
import NewAddressInput from "../newAddressInput/NewAddressInput";
import "./css/style.css";

export default function AddressManagementBox({ closeBtnHandler }) {
  const { addresses } = useAddress();
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
        {addresses.length ? (
          addresses.map(
            ({
              _id,
              contactName,
              phoneNumber,
              firstLineAddress,
              lastLineAddress,
              city,
              state,
              zipCode,
              country,
            }) => (
              <Address
                _id={_id}
                key={_id}
                name={contactName}
                phoneNumber={phoneNumber}
                firstLineAddress={firstLineAddress}
                lastLineAddress={lastLineAddress}
                city={city}
                state={state}
                country={country}
                zipCode={zipCode}
              />
            )
          )
        ) : (
          <p className="--bold-700 --centered-text --opacity-half">
            You have no saved address here.
          </p>
        )}
      </div>
    </div>
  );
}
