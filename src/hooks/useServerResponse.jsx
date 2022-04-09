import { useState } from "react";

export default function useServerResponse() {
  const [serverResponse, setServerResponse] = useState({
    type: null,
    text: null,
  });
  return { serverResponse, setServerResponse };
}
