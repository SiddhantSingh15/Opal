import React from "react";
import SearchParam from "../Utils.js";
import "./ResultsCard.css";
import Summary from "./Summary.js";
import { Backdrop, Button } from "@mui/material";
import styles from "../styles";
import Searchable from "./Searchable";

class ResultsCard extends React.Component {
  state = {
    showSummary: false,
  };

  handleResultsCardClick = (e) => {
    if (
      ["fields", "tags", "element", "results-card"].includes(e.target.className)
    ) {
      this.props.handleToggleDocumentView();
    }
  };

  handleCloseSummary = () => {
    this.setState({
      showSummary: false,
    });
  };

  handleToggleSummary = () => {
    this.setState({
      showSummary: !this.state.showSummary,
    });
  };

  // Given a result field constructs the search param
  getSearchParam = (key, value) => {
    return new SearchParam(key, value, "field", true, { [key]: value, key });
  };

  // Checks if we are currently searching by that param
  paramActive = (param) => {
    for (const p of this.props.app.state.searchParams) {
      if (p.id === param.id && p.type === param.type) {
        return true;
      }
    }
  };

  render() {
    const { fields } = this.props.result;
    const fieldParams = {};
    for (const field in fields) {
      const param = this.getSearchParam(field, fields[field]);
      fieldParams[field] = param;
    }

    // console.log(this.props.result);
    const { type, access, language, date, govlaw } = fieldParams;

    return (
      <div className="results-card" onClick={this.handleResultsCardClick}>
        <div className="fields">
          <div className="element">
            <p>{this.props.result.fields.title}</p>
          </div>
          <div className="element">
            <Searchable
              param={language}
              active={this.paramActive(language)}
              handleClick={() =>
                this.props.app.handleAddSearchParams([language])
              }
            />
          </div>
          <div className="element">
            <Searchable
              param={type}
              active={this.paramActive(type)}
              handleClick={() => this.props.app.handleAddSearchParams([type])}
            />
          </div>
          <div className="element">
            <Searchable
              param={access}
              active={this.paramActive(access)}
              handleClick={() => this.props.app.handleAddSearchParams([access])}
            />
          </div>
          <div className="element">
            <Searchable
              param={date}
              active={this.paramActive(date)}
              handleClick={() => this.props.app.handleAddSearchParams([date])}
            />
          </div>
          <div className="element">
            <Searchable
              param={govlaw}
              active={this.paramActive(govlaw)}
              handleClick={() => this.props.app.handleAddSearchParams([govlaw])}
            />
          </div>
          <div className="tags">
            {/* load in tags for respective result */}
            {this.props.result.tags.map((tagID, key) => {
              const tag = this.props.app.getResultsTag(tagID);
              if (
                tag !== null &&
                !this.props.app.state.searchParams
                  .map((param) => param.id)
                  .includes(tagID)
              ) {
                const searchParam = new SearchParam(
                  tag.id,
                  tag.name,
                  "tag",
                  true,
                  tag
                );
                return (
                  <React.Fragment key={key}>
                    <Searchable
                      param={searchParam}
                      handleClick={() =>
                        this.props.app.handleAddSearchParams([searchParam])
                      }
                    />
                  </React.Fragment>
                );
              }
              return <React.Fragment key={key} />;
            })}
          </div>
        </div>
        <Button
          variant="contained"
          sx={styles.button}
          onClick={this.handleToggleSummary}
          className="clickable buttons"
        >
          SUMMARY
        </Button>
        <Backdrop
          className="clickable"
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={this.state.showSummary}
          onClick={this.handleCloseSummary}
        >
          <Summary
            summary=" Excepteur aliquip laboris et incididunt tempor amet aute dolor amet
        culpa et amet. Nostrud culpa veniam minim occaecat culpa officia qui.
        Irure commodo laborum laborum nisi. Occaecat voluptate adipisicing
        consequat duis dolor occaecat dolor ipsum duis. Est dolore labore
        voluptate pariatur eiusmod duis pariatur est aliqua. Consequat aliquip
        anim officia aute dolore veniam minim ullamco. Sint quis fugiat veniam
        eu non. Est nostrud officia ex nostrud. Commodo consectetur exercitation
        adipisicing voluptate."
            title={this.props.result.fields.title}
          />
        </Backdrop>
      </div>
    );
  }
}

export default ResultsCard;
