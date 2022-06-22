import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://35.231.0.227:8000/api/v1/document/";

const fetchAsync = async (tags) => {
  try {
    const resultsResponse = await axios.post(API_URL, { tags: tags });
    return resultsResponse.data.docs;
  } catch (e) {
    console.log(e);
  }
};

// React hook to get the documents
const useFetchDocuments = () => {
  const [documents, setDocuments] = useState([]);

  const tags = ["5"];

  useEffect(() => {
    fetchAsync(tags).then((docs) => setDocuments(docs));
  }, tags);

  return documents;
};

export default useFetchDocuments;
