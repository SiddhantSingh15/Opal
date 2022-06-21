import React from "react";
import "./Home.css";
import { ReactComponent as OpalLogo } from "../assets/opal.svg";
import SearchBox from "../components/SearchBox.js";
import Searchable from "../components/Searchable";

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        {/* The Logo*/}
        <OpalLogo className="searchLogo" />
        {/* Currently Selected Tags */}
        <div className="search-widget">
          {this.props.app.state.searchParams.length !== 0 && (
            <div className="search-params">
              {this.props.app.state.searchParams.map((param, key) => {
                return (
                  <React.Fragment key={key}>
                    <Searchable
                      param={param}
                      handleClick={() =>
                        this.props.app.handleRemoveSearchParams([param])
                      }
                    />
                  </React.Fragment>
                );
              })}
            </div>
          )}
          <div className="search-box">
            <SearchBox app={this.props.app} />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
