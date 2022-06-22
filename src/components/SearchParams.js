import React from "react";
import Searchable from "./Searchable";

export default function SearchParams() {
  const searchParams = [{ id: "12", name: "shifosafh", type: "tag" }];

  return (
    <React.Fragment>
      {searchParams.map((param, key) => {
        return (
          <React.Fragment key={key}>
            <Searchable
              param={param}
              handleClick={() => this.props.app.handleRemoveSingleParam(param)}
            />
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
}
