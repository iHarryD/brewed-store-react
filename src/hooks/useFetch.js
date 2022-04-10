import { useEffect, useState } from "react";
import axios from "axios";

export default async function useFetch(fetchingURL, setter = null) {
  const [requestStatus, setRequestStatus] = useState({
    loading: false,
    error: null,
    data: null,
  });

  useEffect(
    () =>
      (async () => {
        setRequestStatus((prev) => ({ ...prev, loading: true }));
        try {
          const res = axios.get(fetchingURL);
          setRequestStatus((prev) => ({ ...prev, data: res.data }));
          if (setter) {
            setter(res.data);
          }
          console.log(res.data);
        } catch (err) {
          console.log(err);
          setRequestStatus((prev) => ({ ...prev, error: err }));
        } finally {
          setRequestStatus((prev) => ({ ...prev, loading: false }));
        }
      })(),
    [fetchingURL, setter]
  );

  return { requestStatus };
}
