import { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";
import authLogic from "../utils/authLogic";

// TODO: implement tag caching functionality
const useFetchTags = (tagIDs) => {
  const [tags, setTags] = useState([]);

  /* Authentication (we're already authed) */
  const headers = authLogic.getHeaders();

  useEffect(() => {
    axios
      .post(`${config.BACKEND_URI}/tags`, tagIDs, { headers })
      .then((res) => {
        setTags(
          res.data.tags.map((t) => {
            t.value = t.name;
            delete t.name;
            return t;
          })
        );
      })
      .catch((e) => console.log(e));
  }, []);

  return tags;
};

export default useFetchTags;
