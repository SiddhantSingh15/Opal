import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchParam from './Utils.js'
import NavBar from "./components/NavBar";
import Search from "./pages/Search";
import Results from "./pages/Results";
import useFetch from "./hooks/useFetch";
import "typeface-open-sans"
import axios from "axios";


function App() {


  class MainApp extends React.Component {
    constructor(props) {
      
      super(props); 
      this.state = { 
        page: "search",
        searchParams: [],
        tags: [],
        results: []
      };

      this.handleRenderBody = this.handleRenderBody.bind(this);
      this.handleResults = this.handleResults.bind(this);
      this.handleLoadTags = this.handleLoadTags.bind(this);
      this.handleGetTagsByIds = this.handleGetTagsByIds.bind(this);
      this.handleAddSearchParams = this.handleAddSearchParams.bind(this);
      this.handleRemoveSearchParams = this.handleRemoveSearchParams.bind(this);
      this.handleGoToPage = this.handleGoToPage.bind(this);
      this.fetchTagsAsync = this.fetchTagsAsync.bind(this);
      this.fetchResultsAsync = this.fetchResultsAsync.bind(this);
    }


    componentDidMount() {
      this.fetchTagsAsync("http://localhost:9000/tags");
      
      // axios.post("http://localhost:8000/api/v1/document/", {
      //   "tags": [],
      //   "keywords": [],
      //   "fields": {}
      // })
      // .then(function (response) {console.log(response);}).catch(function (error) {console.log(error);});
      // this.timer = setInterval(() => this.fetchTagsAsync("http://localhost:9000/tags"), 5000);
    }

    componentWillUnmount() {
      // clearInterval(this.timer);
      // this.timer = null;
    }
  
    async fetchTagsAsync(url) {
      try {
        const response = await axios.get(url);
        this.setState({tags: 
          this.handleLoadTags(response.data)})
      } catch (e) {
          console.log(e);
      }
    }

    async fetchResultsAsync(url) {
      try {
        const response = await axios.get(url);
        this.setState({results: 
          response.data})
      } catch (e) {
          console.log(e);
      }
    }
  
    handleGoToPage(page) {
      this.setState({page: page});
    }

    handleAddSearchParams(params) {
      this.setState({searchParams: this.state.searchParams.concat(params)});
    }

    handleRemoveSearchParams(params) {
      this.setState({searchParams: 
        this.state.searchParams
        .filter((searchParam) => !params.includes(searchParam))});
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
      this.handleGoToPage("results");
    }

    render() {
      return (
        <div className="app">

          <div>
            <NavBar app={this} />
            {this.handleRenderBody()}
          </div>
        </div>
      );
    }
  }

  return (
    <MainApp/>
    )
}

export default App;
