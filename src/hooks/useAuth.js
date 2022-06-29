import { useEffect, useState } from "react";
import authLogic from "../utils/authLogic";

/** Authenticates the user, otherwise, redirects to home page. */
const useAuth = () => {
  const [response, setResponse] = useState({});

  useEffect(() => {
    const credentials = authLogic.getCredentials();
    if (!credentials) {
      setResponse({ success: false, message: "Auth credentials non present" });
    } else {
      const [username, password] = credentials;

      authLogic
        .loginRequest(username, password)
        .then((res) => {
          if (!res) {
            setResponse({ success: false, message: "Unknown error" });
            return;
          }
          if (!res.authenticated) {
            setResponse({
              success: false,
              message: "Invalid username and password",
            });
          } else {
            setResponse({ success: true, admin: res.user.role === "admin" });
          }
        })
        .catch((err) => {
          console.log(err);
          setResponse({ success: false, message: "Unknown error" });
        });
    }
  }, [sessionStorage.getItem("auth")]);

  return response;
};

export default useAuth;
