import addressAxiosInstance from "./axiosInstances/addressAxiosInstance";

export async function getAddresses(addressSetter) {
  if (!localStorage.getItem("logged-in")) return addressSetter([]);
  try {
    const res = await addressAxiosInstance().get("");
    if (Array.isArray(res.data)) {
      addressSetter(res.data);
    }
  } catch (err) {
    console.log(err);
  }
}

export async function addAddress(addressSetter, address) {
  try {
    const res = await addressAxiosInstance().post("", { address });
    if (Array.isArray(res.data)) {
      addressSetter(res.data);
    }
  } catch (err) {
    console.log(err);
  }
}

export async function deleteAddress(addressSetter, addressID) {
  try {
    const res = await addressAxiosInstance().delete("", { addressID });
    if (Array.isArray(res.data)) {
      addressSetter(res.data);
    }
  } catch (err) {
    console.log(err);
  }
}
