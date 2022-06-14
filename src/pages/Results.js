import React from "react";
import "./Results.css";
import Tag from "../components/Tag";
import DocumentView from "../components/DocumentView.js"
import useFetch from "../hooks/useFetch";
import {ReactComponent as PreviewIcon} from "../assets/preview.svg"


const Results = ({app}) => {
  
  class Results extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
         viewingDoc:false
      }
      this.handleDisplayResults = this.handleDisplayResults.bind(this);
      this.handleDisplaySearching = this.handleDisplaySearching.bind(this);
      this.handleDisplaySearchParams = this.handleDisplaySearchParams.bind(this);
      this.handleToggleDocumentView = this.handleToggleDocumentView.bind(this);

    }

    handleDisplaySearchParams() {
      return (
        <React.Fragment>
          {this.props.app.state.searchParams.map(
            (param,key) => {
              return (
                <React.Fragment key={key}>
                  <Tag
                    tagData={param}
                    handleClick={() => this.props.app.handleRemoveSearchParams([param])}
                  />
                </React.Fragment>
                )})}
        </React.Fragment>
      )
    }

    handleDisplaySearching() {
      return (
        <div className="searching-notification">
          <h1>Searching</h1>
          <div className="loader"></div>
        </div>
      )
    }

    handleDisplayResults() {
      return( 
        <div className="results-table">
          <div className="grid-title">
            <div className="grid-element">Name</div>
            <div className="grid-element">Language</div>
            <div className="grid-element">Topic</div>
            <div className="grid-element">Source</div>
            <div className="grid-element">Date</div>
            <div className="grid-element">Gov Law</div>
          </div>
          {this.props.data.map((result,key) => {
            return (
              <div  key = {0 + 10*key}  className = "grid-row">
                <div key = {1 + 10*key} className = "grid-row-properties"  >
                  <div key = {2 + 10*key} className="grid-element"><p>{result.name}</p></div>
                  <div key = {3 + 10*key} className="grid-element"><p>{result.language}</p></div>
                  <div key = {4 + 10*key} className="grid-element"><p>{result.topic}</p></div>
                  <div key = {5 + 10*key} className="grid-element"><p>{result.source}</p></div>
                  <div key = {6 + 10*key} className="grid-element"><p>{result.date}</p></div>
                  <div key = {7 + 10*key} className="grid-element"><p>{result.govlaw}</p></div>
                  <div key = {8 + 10*key} className="results-element-tags">
                  {/* load in tags for respective result */}
                  {
                    this.props.app.handleGetTagsByIds(result.tags)
                    .filter((tag) => !this.props.app.state.searchParams.includes(tag))
                    .map((tag,key) => {
                      return (
                      <React.Fragment key = {key}>
                        <Tag tagData={tag} handleClick={() => this.props.app.handleAddSearchParams([tag])}/>
                      </React.Fragment>
                      )
                    })
                  }
                  </div>
                </div>
                <div key = {9 + 10*key} className="grid-row-buttons" onClick={this.handleToggleDocumentView}>
                    <PreviewIcon/>
                  </div>
              </div>
              )
          }
          )}
        </div>
      )
    }

    handleToggleDocumentView() {
      this.setState({viewingDoc: !this.state.viewingDoc})
    }

    render() {
      return (
        <div className="results-body">


          {/* Popup for previewing the document */}
          <DocumentView
            isOpen={this.state.viewingDoc} 
            toggleModal={this.handleToggleDocumentView}/>

          <div className = "results-search">
            <h1>Results for:</h1>
            <div className = "results-search-params">
              {this.handleDisplaySearchParams()}
            </div>
          </div>
          

          
          {!this.props.data && this.handleDisplaySearching()}
          {this.props.data && this.handleDisplayResults()}
      </div>
      )
    }
  }

  const {data, isPending, error} =  useFetch("http://localhost:8000/files");

  return (<Results data={data} app={app}/>);
}

export default Results;
