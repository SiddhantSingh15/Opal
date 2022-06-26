import React from "react";
import "../pages/Results.css";

export default function Loading() {
  return (
    <div className="loading">
      <h1>Searching</h1>
      <div className="loader"></div>
    </div>
  );
}
