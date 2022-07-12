import { faCheckCircle as faRCheckCircle } from "@fortawesome/free-regular-svg-icons";
import {
  faTrash,
  faCheckCircle as faSCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAddress } from "../../contexts/addressContext";
import { deleteAddress } from "../../services/addressServices";
import "./css/style.css";

export function Address({
  _id,
  name,
  phoneNumber,
  firstLineAddress,
  lastLineAddress,
  city,
  state,
  zipCode,
  country,
}) {
  const { selectedAddress, setSelectedAddress, setAddresses, addresses } =
    useAddress();
  return (
    <div className="address-container --has-padding">
      <div className="address-btn-container --horizontal-flex --has-gap">
        <button
          className="address-delete-btn btn --icon-btn"
          onClick={() => deleteAddress(setAddresses, _id)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
        <button
          className="address-select-btn btn --icon-btn"
          onClick={() => {
            if (selectedAddress) return;
            const selectedAddressDetails = addresses.find(
              (address) => address._id === _id
            );
            setSelectedAddress(selectedAddressDetails);
          }}
        >
          {selectedAddress?._id === _id ? (
            <FontAwesomeIcon icon={faSCheckCircle} />
          ) : (
            <FontAwesomeIcon icon={faRCheckCircle} />
          )}
        </button>
      </div>
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

export function CheckoutAddress({
  _id,
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
    <div className="address-container --checkout-variant --has-padding">
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
