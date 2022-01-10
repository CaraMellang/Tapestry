import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Main from "./pages/Main";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path={`/`} element={<Main />} />
        <Route path={`/home`} element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
