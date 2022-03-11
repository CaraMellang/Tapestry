import React from "react";
import "./App.css";
import Main from "./pages/Main";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { theme } from "./lib/theme";

function App() {
  return (
    // <ThemeProvider
    //   theme={
    //     localStorage.getItem("theme") === "dark"
    //       ? theme.darkTheme
    //       : theme.lightTheme
    //   }
    // >
      <>
        <GlobalStyled />
        <Main />
      </>
    // </ThemeProvider>
  );
}

const GlobalStyled = createGlobalStyle`
body {

  /* background:${({ theme }: any) => theme.bgColor};
  color:${({ theme }: any) => theme.textColor} ; */
  transition: all 0.2s ease-in-out;
}
body {
  --color-text: black;
  --color-background: white; 
}

@media (prefers-color-scheme: dark) { //사용자 시스템이 다크모드일경우.
  body {
    --color-text: white;
    --color-background: black; 
  }
}
body[data-theme="light"]{
  --color-text:black;
  --color-background:white;
  --color-box-background:#FFFFFF
}
body[data-theme="dark"]{
  --color-text:white;
  --color-background:black;
  --color-box-background:#1E1E1E
}
body{
  color:var(--color-text);
  background:var(--color-background);
  .div-theme{
    background:var(--color-box-background);
  }
  .div-box{
    background:var(--color-box-background);
  }
}
/* .div-theme{
  background:${({ theme }: any) => theme.bgColor}
}
.div-box{
  background:${({ theme }: any) => theme.darkBoxTheme}
} */
h1,h2,h3,h4,h5,h6 , a , input{
  color: inherit;
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
textarea{
  resize:none;
}
textarea:focus{
  outline:none;
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
