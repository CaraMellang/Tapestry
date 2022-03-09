import React from "react";
import "./App.css";
import Main from "./pages/Main";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { theme } from "./lib/theme";

function App() {
  return (
    <ThemeProvider
      theme={
        localStorage.getItem("theme") === "dark"
          ? theme.darkTheme
          : theme.lightTheme
      }
    >
      <>
        <GlobalStyled />
        <Main />
      </>
    </ThemeProvider>
  );
}

const GlobalStyled = createGlobalStyle`
body {

  background:${({ theme }: any) => theme.bgColor};
  color:${({ theme }: any) => theme.textColor} ;
  transition: all 0.2s ease-in-out;
}
html , body , #root{
  /* height:100%; */
  background-repeat:no-repeat;
  width:100%;
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
