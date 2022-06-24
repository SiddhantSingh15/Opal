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
    return null;
  }
};

export default loginRequest;
