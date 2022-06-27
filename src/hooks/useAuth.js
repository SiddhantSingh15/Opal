import CryptoJS from "crypto-js";
import { useEffect, useState } from "react";
import config from "../config";
import authLogic from "../utils/authLogic";

/** Authenticates the user, otherwise, redirects to home page. */
const useAuth = () => {
  const [response, setResponse] = useState({});

  useEffect(() => {
    const encrypted = sessionStorage.getItem("auth");
    if (!encrypted) {
      setResponse({ success: false, message: "Auth credentials non present" });
    } else {
      const decrypted = CryptoJS.AES.decrypt(encrypted, "secret").toString(
        CryptoJS.enc.Utf8
      );

      const split = decrypted.split(config.CREDENTIALS_SEPARATOR);
      if (split.length !== 2)
        throw new Error("Username Password not split properly");

      const [username, password] = split;

      authLogic.loginRequest(username, password)
        .then((res) => {
          if (!res.authenticated) {
            setResponse({
              success: false,
              message: "Invalid username and password",
            });
          } else {
            setResponse({ success: true });
          }
        })
        .catch((err) => {
          console.log(err);
          setResponse({ success: false, message: "Unknown error" });
        });
    }
  }, []);

  return response;
};

export default useAuth;
