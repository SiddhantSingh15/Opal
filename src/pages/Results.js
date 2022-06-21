import React from "react";
import "./Results.css";
import Tag from "../components/Tag";
import DocumentView from "../components/DocumentView.js";
import { ReactComponent as BackArrow } from "../assets/backarrow.svg";
import Result from "../components/Result";
import SearchBox from "../components/SearchBox";

class Results extends React.Component {
  state = {
    viewingDoc: false,
  };

  handleDisplaySearchParams = () => {
    return (
      <React.Fragment>
        {this.props.app.state.searchParams.map((param, key) => {
          return (
            <React.Fragment key={key}>
              <Tag
                tagData={param}
                handleClick={() =>
                  this.props.app.handleRemoveSearchParams([param])
                }
              />
            </React.Fragment>
          );
        })}
      </React.Fragment>
    );
  };

  handleDisplaySearching = () => {
    return (
      <div className="loading">
        <h1>Searching</h1>
        <div className="loader"></div>
      </div>
    );
  };

  handleDisplayResults = () => {
    return (
      <div className="table">
        <div className="title">
          <div className="element">Title</div>
          <div className="element">Language</div>
          <div className="element">Topic</div>
          <div className="element">Source</div>
          <div className="element">Date</div>
          <div className="element">Gov Law</div>
        </div>
        {this.props.app.state.results.map((result, key) => {
          return (
            <Result
              key={key}
              result={result}
              searchParams={this.props.app.state.searchParams}
              handleToggleDocumentView={this.handleToggleDocumentView}
              handleAddSearchParams={this.props.app.handleAddSearchParams}
            />
          );
        })}
      </div>
    );
  };

  handleToggleDocumentView = () => {
    this.setState({ viewingDoc: !this.state.viewingDoc });
  };

  render() {
    return (
      <div className="results">
        {/* Popup for previewing the document */}
        <DocumentView
          isOpen={this.state.viewingDoc}
          toggleModal={this.handleToggleDocumentView}
        />

        <div className="info-bar">
          <div className="search-box">
            <SearchBox app={this.props.app} />
          </div>
          <div className="params">{this.handleDisplaySearchParams()}</div>
          <BackArrow
            className="back-icon"
            onClick={() => this.props.app.handleGoToPage("home")}
          />
        </div>

        {!this.props.app.state.results && this.handleDisplaySearching()}
        {this.props.app.state.results && this.handleDisplayResults()}
      </div>
    );
  }
}

export default Results;
