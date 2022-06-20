import React from "react";
import "./Results.css";
import Tag from "../components/Tag";
import DocumentView from "../components/DocumentView.js"
import {ReactComponent as PreviewIcon} from "../assets/preview.svg"
import {ReactComponent as BackArrow} from "../assets/backarrow.svg"
import SearchParam from '../Utils.js'
import SearchBox from "../components/SearchBox";

class Results extends React.Component {

  state = {
    viewingDoc:false 
  }

  handleDisplaySearchParams = () => {
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

  handleDisplaySearching = () => {
    return (
      <div className="searching-notification">
        <h1>Searching</h1>
        <div className="loader"></div>
      </div>
    )
  }

  handleDisplayResults = () => {
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
                {result.tags.map((tagID,key) => {
                  const tag = this.props.app.getResultsTag(tagID);
                  if (tag !== null &&
                    !this.props.app.state.searchParams.map(param => param.id).includes(tagID)) {
                    const searchParam = new SearchParam(tag.id,tag.name,"tag",true,tag)
                    return (
                      <React.Fragment key = {key}>
                        <Tag tagData={searchParam} handleClick={() => this.props.app.handleAddSearchParams([searchParam])}/>
                      </React.Fragment>
                    )
                  }
                  return <React.Fragment key = {key}/>
                })}
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

  handleToggleDocumentView = () => {
    this.setState({viewingDoc: !this.state.viewingDoc})
  }

  render() {
    
    return (
      <div className="results-body">

        {/* Popup for previewing the document */}
        <DocumentView
          isOpen={this.state.viewingDoc} 
          toggleModal={this.handleToggleDocumentView}/>

        <div className="results-info-bar">
          <div className="search-box">
            <SearchBox app={this.props.app}/>
          </div>
          <div className = "results-search">
            <h1>Results for:</h1>
            <div className = "results-search-params">
              {this.handleDisplaySearchParams()}
            </div>
          </div>
          <BackArrow 
            className="back-icon"
            onClick={() => this.props.app.handleGoToPage("search")}/>
        </div>
        
        {!this.props.app.state.results && this.handleDisplaySearching()}
        {this.props.app.state.results && this.handleDisplayResults()}
    </div>
    )
  }
}

export default Results;
