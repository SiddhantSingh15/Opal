import React, { useEffect } from "react";
import NavBar from "./components/NavBar";
import { Routes, Route, useSearchParams } from "react-router-dom";
import Results from "./pages/Results";
import "typeface-open-sans";
import querySearch from "./utils/querySearch";
import useFetchTags from "./hooks/useFetchTags";
import { useDispatch } from "react-redux";
import { restoreSearch } from "./redux/searchSlice";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import "./App.css"

export default function App() {
  /* Restore tags redux */
  const params = useSearchParams()[0];
  const { tags, fields } = querySearch.getSearchParams(params);
  const restored = useFetchTags(tags);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(restoreSearch({ restored, fields }));
  }, [restored]);

  return (
    <div className="app">
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<Results />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </div>
  );
}
