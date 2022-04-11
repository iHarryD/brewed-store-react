import baseAxiosInstance from "./axiosInstances/baseAxiosInstance";

export async function handleLogin({
  email,
  password,
  loggingInStateSetter,
  serverResponseSetter,
  loginStateSetter,
}) {
  if (!email || !password)
    return serverResponseSetter({
      type: "error",
      text: "Fill both fields to proceed.",
    });
  loggingInStateSetter(true);
  try {
    const res = await baseAxiosInstance().post("/login", {
      email: email,
      password: password,
    });
    serverResponseSetter({
      type: "success",
      text: res.data.message,
    });
    localStorage.setItem("auth-token", res.data.token);
    localStorage.setItem("logged-in", true);
    localStorage.setItem("user-name", res.data.firstName);
    loginStateSetter({ status: true, userName: res.data.firstName });
  } catch (err) {
    serverResponseSetter({
      type: "error",
      text: err.response.data,
    });
  } finally {
    loggingInStateSetter(false);
  }
}

// Context Error: To solve
