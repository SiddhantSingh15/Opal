import { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";
import authLogic from "../utils/authLogic";

const useFetchNotifications = (count, isAdmin) => {
  const [notifications, setNotifications] = useState([]);

  const headers = authLogic.getHeaders();
  useEffect(() => {
    axios
      .get(`${config.BACKEND_URI}/users/notifications`, { headers })
      .then((res) => {
        let notifs = res.data.notifications;
        if (isAdmin)
          notifs = notifs.filter((not) => not.type === "access_request");
        else
          notifs = notifs.filter(
            (not) =>
              not.type === "access_grant" && not.receiver === headers.username
          );

        setNotifications(notifs);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [count]);

  return notifications;
};

export default useFetchNotifications;
