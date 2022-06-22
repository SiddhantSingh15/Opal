import { useState, useEffect } from "react";

// TODO: implement tag filtering functionality
const useFetchTags = (tagIDs) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    setTags([
      { id: "10", value: "blabla" },
      { id: "10", value: "blabla" },
      { id: "10", value: "blabla" },
    ]);
  }, tagIDs);

  return tags;
};

export default useFetchTags;
