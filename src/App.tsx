import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Main from "./pages/Main";
import { Routes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

function App() {
  return (
    <>
      <GlobalStyled />
      <Main />
    </>
  );
}

const GlobalStyled = createGlobalStyle`
html , body , #root{
  /* height:100%; */
  /* background: #181818; */
  /* background: rgb(241, 147, 147);
  background: linear-gradient(
    180deg,
    rgba(19, 68, 88, 1) 10%,
    rgba(182, 114, 114, 1) 100%
  ); */
  background-repeat:no-repeat;
  /* background: #181818; */
  /* #121212 */
  width:100%;
  /* height:100%; */
  /* height:100vh; */
  font-family: 'Spoqa Han Sans Neo', 'sans-serif'; 
}
a, a:link, a:visited , a:hover , a:focus{
  text-decoration:none;
  color:unset
}
input:focus{
  outline:none;
}
  body::-webkit-scrollbar {
    width: 6px;
    /* border-radius: 10px; */
  }
  body::-webkit-scrollbar-thumb {
    background-color: #2f3542;
    /* border-radius: 10px; */
  }
  body::-webkit-scrollbar-track {
    background-color: grey;
    /* border-radius: 10px; */
  }
`;

export default App;
