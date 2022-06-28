import React from "react";
import "./Home.css";
import { ReactComponent as OpalLogo } from "../assets/opal.svg";
import SearchBox from "../components/SearchBox.js";
import Searchable from "../components/Searchable";
import { useSelector } from "react-redux";

export default function Home() {
  const tags = useSelector((state) => state.search.tags);

  return (
    <div className="home">
      {/* The Logo*/}
      <OpalLogo className="searchLogo" />
      {/* Currently Selected Tags */}
      <div className="search-widget">
        {tags.length !== 0 && (
          <div className="search-params">
            {tags.map((tag, key) => {
              return (
                <React.Fragment key={key}>
                  <Searchable type="tag" id={tag.id} value={tag.value} />
                </React.Fragment>
              );
            })}
          </div>
        )}
        <div className="search-box">
          <SearchBox animated />
        </div>
      </div>
    </div>
  );
}
