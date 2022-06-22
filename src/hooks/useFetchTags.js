import { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";

// TODO: implement tag filtering functionality
// TODO: implement tag caching functionality
const useFetchTags = (tagIDs) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    console.log(`${config.BACKEND_URI}/tags`);
    console.log(tagIDs);
    axios
      .post(`${config.BACKEND_URI}/tags`, tagIDs)
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  }, tagIDs);

  return [{ id: "1", value: "lanosdao" }];
};

export default useFetchTags;
