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

export async function addAddress(successCallback, address, loadingStateSetter) {
  try {
    if (loadingStateSetter) loadingStateSetter(true);
    const result = await addressAxiosInstance().post("", address);
    if (successCallback) {
      successCallback(result);
    }
  } catch (err) {
    console.log(err);
  } finally {
    if (loadingStateSetter) loadingStateSetter(false);
  }
}

export async function deleteAddress(successCallback, addressID) {
  try {
    const result = await addressAxiosInstance().delete(
      `/?addressID=${addressID}`
    );
    if (successCallback) successCallback(result);
  } catch (err) {
    console.log(err);
  }
}
