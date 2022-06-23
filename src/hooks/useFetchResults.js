import { useState, useEffect } from "react";
import axios from "axios";
import useGetSearchParams from "./useGetSearchParams";
import config from "../config";

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
  const query = useGetSearchParams();
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    fetchAsync(query).then((docs) => setDocuments(docs));
  }, []);

  return documents;
};

export default useFetchDocuments;
