import { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";
import { useSearchParams } from "react-router-dom";
import querySearch from "../utils/querySearch";

const fetchAsync = async (query) => {
  try {
    const resultsResponse = await axios.post(`${config.BACKEND_URI}/document`, {
      ...query,
    });
    return resultsResponse.data.docs;
  } catch (e) {
    console.log(e);
  }
};

// React hook to get the documents
const useFetchDocuments = () => {
  const params = useSearchParams()[0];
  const query = querySearch.getSearchParams(params);
  const [documents, setDocuments] = useState(null);

  useEffect(() => {
    fetchAsync(query).then((docs) => setDocuments(docs));
  }, []);

  return documents;
};

export default useFetchDocuments;
