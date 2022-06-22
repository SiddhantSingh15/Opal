import { useState, useEffect } from "react";
import axios from "axios";
import useGetSearchParams from "./useGetSearchParams";

const API_URL = "http://35.231.0.227:8000/api/v1/document/";

const fetchAsync = async (query) => {
  console.log(query);
  try {
    const resultsResponse = await axios.post(API_URL, { ...query });
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
