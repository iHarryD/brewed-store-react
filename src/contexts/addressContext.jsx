import { createContext, useState, useContext, useEffect } from "react";

import { useAuth } from "./authContext";
import { getAddresses } from "../services/addressServices";

const AddressContext = createContext();

export function AddressProvider({ children }) {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const { isLoggedIn } = useAuth();

  useEffect(() => getAddresses(setAddresses), [isLoggedIn]);

  return (
    <AddressContext.Provider
      value={{ addresses, setAddresses, selectedAddress, setSelectedAddress }}
    >
      {children}
    </AddressContext.Provider>
  );
}

export function useAddress() {
  return useContext(AddressContext);
}
