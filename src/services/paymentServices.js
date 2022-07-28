import paymentAxiosInstance from "./axiosInstances/paymentAxiosInstance";

export async function createPayment() {
  try {
    const result = await paymentAxiosInstance().post();
    return result;
  } catch (err) {
    console.log(err);
  }
}
