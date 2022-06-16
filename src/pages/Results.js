import React from "react";
import "./Results.css";
import Tag from "../components/Tag";
import DocumentView from "../components/DocumentView.js"
import {ReactComponent as PreviewIcon} from "../assets/preview.svg"



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
          <div className="grid-element">Title</div>
          <div className="grid-element">Language</div>
          <div className="grid-element">Topic</div>
          <div className="grid-element">Source</div>
          <div className="grid-element">Date</div>
          <div className="grid-element">Gov Law</div>
        </div>
        {this.props.app.state.results.map((result,key) => {
          return (
            <div  key = {0 + 10*key}  className = "grid-row">
              <div key = {1 + 10*key} className = "grid-row-properties"  >
                <div key = {2 + 10*key} className="grid-element"><p>{result.fields.title}</p></div>
                <div key = {3 + 10*key} className="grid-element"><p>{result.fields.language}</p></div>
                <div key = {4 + 10*key} className="grid-element"><p>{result.fields.topic}</p></div>
                <div key = {5 + 10*key} className="grid-element"><p>{result.fields.source}</p></div>
                <div key = {6 + 10*key} className="grid-element"><p>{result.fields.date}</p></div>
                <div key = {7 + 10*key} className="grid-element"><p>{result.fields.govlaw}</p></div>
                <div key = {8 + 10*key} className="results-element-tags">
                {/* load in tags for respective result */}
                {/* {
                  this.props.app.handleGetTagsByIds(result.fields.tags)
                  .filter((tag) => !this.props.app.state.searchParams.includes(tag))
                  .map((tag,key) => {
                    return (
                    <React.Fragment key = {key}>
                      <Tag tagData={tag} handleClick={() => this.props.app.handleAddSearchParams([tag])}/>
                    </React.Fragment>
                    )
                  })
                } */}
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
        
        {!this.props.app.state.results && this.handleDisplaySearching()}
        {this.props.app.state.results && this.handleDisplayResults()}
    </div>
    )
  }
}

export default Results;
