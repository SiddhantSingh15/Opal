import config from "../config";
import CryptoJS from "crypto-js";
import axios from "axios";

const loginRequest = async (email, password) => {
  const hash = CryptoJS.SHA256(password);
  const headers = { username: email, password: hash };
  try {
    const result = await axios.get(`${config.BACKEND_URI}/users/auth`, {
      headers,
    });
    return result.data;
  } catch (e) {
    console.log(e);
    return e.response ? e.response.data : null;
  }
};

const signupRequest = async (email, password) => {
  const hash = CryptoJS.SHA256(password).toString();
  const headers = { username: email, password: hash };
  try {
    const result = await axios.post(
      `${config.BACKEND_URI}/users/create`,
      {},
      {
        headers,
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

/** Get email and password from localstorage.
 * @return {array} [username, hashedPsw]
 */
const getCredentials = () => {
  const encrypted = sessionStorage.getItem("auth");
  if (!encrypted) return null;

  const decrypted = CryptoJS.AES.decrypt(encrypted, "secret").toString(
    CryptoJS.enc.Utf8
  );

  const split = decrypted.split(config.CREDENTIALS_SEPARATOR);
  if (split.length !== 2)
    throw new Error("Username Password not split properly");

  return split;
};

const getHeaders = () => {
  const credentials = getCredentials();
  if (!credentials) {
    return null;
  }
  const [username, psw] = credentials;
  return { username, password: CryptoJS.SHA256(psw).toString() };
};

const authLogic = { loginRequest, signupRequest, getCredentials, getHeaders };

export default authLogic;
