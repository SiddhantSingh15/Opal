import { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";

// TODO: implement tag filtering functionality
// TODO: implement tag caching functionality
const useFetchTags = (tagIDs) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    axios
      .post(`${config.BACKEND_URI}/tags`, tagIDs)
      .then((res) =>
        setTags(
          res.data.tags.map((t) => {
            t.value = t.name;
            delete t.name;
            return t;
          })
        )
      )
      .catch((e) => console.log(e));
  }, []);

  return tags;
};

export default useFetchTags;
