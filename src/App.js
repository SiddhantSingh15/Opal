import "./App.css";
import React from "react";
import NavBar from "./components/NavBar";
import Search from "./pages/Search";
import Results from "./pages/Results";
import "typeface-open-sans"
import axios from "axios";


function App() {


  class MainApp extends React.Component {
    constructor(props) {
      
      super(props); 
      this.state = { 
        page: "search",
        searchParams: [],
        results: [],
        resultsTags: []
      };

      this.handleRenderBody = this.handleRenderBody.bind(this);
      this.handleResults = this.handleResults.bind(this);
      this.handleAddSearchParams = this.handleAddSearchParams.bind(this);
      this.handleRemoveSearchParams = this.handleRemoveSearchParams.bind(this);
      this.handleGoToPage = this.handleGoToPage.bind(this);
      this.fetchResultsAsync = this.fetchResultsAsync.bind(this);
    }

    async fetchResultsAsync() {
      const documentAddress = "http://35.231.0.227:8000/api/v1/document/";
      // const tagsAddress = "http://35.231.0.227:8000/api/v1/tags/";
      this.setState({results:null})

      // Loads the json results
      try {
        const response = await axios.post(documentAddress,{
          tags: this.state.searchParams
            .filter(param=>(param.type === "tag"))
            .map(param => param.id),
          keywords : [],
          fields: {}
          // Add key words and fields when they work
        });
        this.setState({results: 
          response.data.docs})
      } catch (e) {
          console.log(e);
      }

      //Loads union of the tags of each result
      // try {
      //   const response = await axios.get(tagsAddress + "?id="
      //      this.state.results.fl);
      //   this.setState({results: 
      //     response.data.docs})
      // } catch (e) {
      //     console.log(e);
      // }

    }
  
    handleGoToPage(page) {
      this.setState({page: page});
    }

    handleAddSearchParams(params) {
      this.setState({searchParams: this.state.searchParams.concat(params)},
        this.fetchResultsAsync
      );
    }

    handleRemoveSearchParams(params) {
      this.setState({searchParams: 
        this.state.searchParams
        .filter((searchParam) => 
        !params.map(params => params.id).includes(searchParam.id))},
        this.fetchResultsAsync
      );
    }

    handleRenderBody(event) {
      switch (this.state.page) {
        case "search":
          return <Search 
                    app={this}/>
        case "results":
          return <Results
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
