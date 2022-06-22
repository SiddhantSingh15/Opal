import axios from "axios";
import React from "react";
import { useState } from "react";

class SearchState {
  constructor() {
    this.documentAddress = "http://35.231.0.227:8000/api/v1/document/";
    this.tagIds = [];
    this.keywords = [];
    this.fields = {};
  }

  addSearchParams = (searchParams) => {
    const [state, setstate] = useState(null);
    searchParams.map((param) => this.addParam(param));
    setstate(false);
  };

  addParam = (param) => {
    switch (param.type) {
      case "tag":
        this.tagIds.append(param.obj.id);
        break;
      case "search":
        this.keywords.append(param.obj);
        break;
      case "field":
        this.fields[param.id] = param.name;
        break;
      default:
        console.log("ERROR: processing search param not yet implimented");
    }
  };

  fetchAsync = async () => {
    try {
      const resultsResponse = await axios.post(this.documentAddress, {
        tags: this.tagIDs,
        keywords: this.keywords,
        fields: this.fields,
      });
      this.setState({ results: resultsResponse.data.docs }, () => {
        this.fetchResultTagsAsync(resultsResponse.data.docs);
      });
      return resultsResponse;
    } catch (e) {
      console.log(e);
    }
  };
}

export default new SearchState();
