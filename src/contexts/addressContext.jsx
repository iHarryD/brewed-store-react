import { createContext, useState, useContext, useEffect } from "react";

import { useAuth } from "./authContext";
import { getAddresses } from "../services/addressServices";

const AddressContext = createContext();

export function AddressProvider({ children }) {
  const [addresses, setAddresses] = useState([]);
  const { isLoggedIn } = useAuth();

  useEffect(() => getAddresses(setAddresses), [isLoggedIn]);

  return (
    <AddressContext.Provider value={{ addresses, setAddresses }}>
      {children}
    </AddressContext.Provider>
  );
}

export function useCart() {
  return useContext(AddressContext);
}
