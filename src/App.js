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
        tags: [],
        results: []
      };

      this.handleRenderBody = this.handleRenderBody.bind(this);
      this.handleResults = this.handleResults.bind(this);
      this.handleGetTagsByIds = this.handleGetTagsByIds.bind(this);
      this.handleAddSearchParams = this.handleAddSearchParams.bind(this);
      this.handleRemoveSearchParams = this.handleRemoveSearchParams.bind(this);
      this.handleGoToPage = this.handleGoToPage.bind(this);
      this.fetchResultsAsync = this.fetchResultsAsync.bind(this);
    }


    componentDidMount() {
      
    }

    componentWillUnmount() {
      // clearInterval(this.timer);
      // this.timer = null;
    }
  
    async fetchResultsAsync(url) {
      this.setState({results:null})
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
      this.fetchResultsAsync("http://localhost:9000/files");
    }

    handleRemoveSearchParams(params) {
      this.setState({searchParams: 
        this.state.searchParams
        .filter((searchParam) => 
        !params.map(params => params.id).includes(searchParam.id))});
      this.fetchResultsAsync("http://localhost:9000/files");
    }


    handleGetTagsByIds(ids) {
      return this.state.tags.filter(tag => ids.includes(tag.id))
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
