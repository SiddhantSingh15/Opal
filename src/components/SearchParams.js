import React from "react";
import { useSelector } from "react-redux";
import Searchable from "./Searchable";

export default function SearchParams() {
  const { tags, fields } = useSelector((state) => state.search);

  return (
    <div>
      {tags.map((tag, key) => (
        <div key={key}>
          <Searchable type="tag" id={tag.id} value={tag.value} />
        </div>
      ))}
      {Object.keys(fields).map((fieldKey, key) => (
        <div key={key}>
          <Searchable type="field" id={fieldKey} value={fields[fieldKey]} />
        </div>
      ))}
    </div>
  );
}
