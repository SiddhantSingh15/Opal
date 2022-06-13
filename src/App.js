import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchParam from './Utils.js'
import NavBar from "./components/NavBar";
import Search from "./pages/Search";
import Results from "./pages/Results";
import useFetch from "./hooks/useFetch";
import "typeface-open-sans"
import { PropaneSharp } from "@mui/icons-material";

function App() {


  class MainApp extends React.Component {
    constructor(props) {

      super(props); 
      this.state = { 
        page: "search",
        searchParams: [],
        // For dev
        // page: "results",
        // searchParams: [new SearchParam("tag1","doc-type",true,null),new SearchParam("tag2","doc-type",true,null)],
        tags: this.handleLoadTags(props.tags)
      };

      this.handleRenderBody = this.handleRenderBody.bind(this);
      this.handleResults = this.handleResults.bind(this);
      this.handleLoadTags = this.handleLoadTags.bind(this);
      this.handleGetTagsByIds = this.handleGetTagsByIds.bind(this);
    }

    handleLoadTags(tags) {
      if (tags) {
        return tags.map(tag => new SearchParam(tag.name, tag.class, true, tag));
      } else {
        return []
      }
    }

    handleGetTagsByIds(ids) {
      return this.state.tags.filter(tag => ids.includes(tag.obj.id))
    }

    handleRenderBody(event) {
      switch (this.state.page) {
        case "search":
          return <Search 
                    handleResults={this.handleResults}
                    app={this}/>
        case "results":
          return <Results
                    handleGetTagsByIds={this.handleGetTagsByIds}
                    app={this}/>
        default:
          return <div></div>
      }
    }

    handleResults(event) {
      this.setState({page: "results"})
    }

    render() {
      return (
        <div className="app">
          <div>
            <NavBar searchEnabled={false} />
            {this.handleRenderBody()}
          </div>
        </div>
      );
    }
  }

  //Load this on construction
  const {data: tags, isPending, error} =  useFetch("http://localhost:8000/tags");

  return (
    <MainApp tags={tags}/>
    )
}

export default App;
