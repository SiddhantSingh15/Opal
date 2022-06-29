import { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";
import authLogic from "../utils/authLogic";

const useFetchNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  const headers = authLogic.getHeaders();
  useEffect(() => {
    axios
      .get(`${config.BACKEND_URI}/users/notifications`, { headers })
      .then((res) => setNotifications(res.data.notifications))
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return notifications;
};

export default useFetchNotifications;
