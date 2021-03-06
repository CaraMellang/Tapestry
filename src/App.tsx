import React from "react";
import "./App.css";
import Main from "./pages/Main";
import { createGlobalStyle } from "styled-components";
// import { theme } from "./lib/theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { createTheme, ThemeProvider } from "@mui/material";

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    primary: {
      main: `#816BFF`,
    },
  },
});

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
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyled />
          <Main />
        </ThemeProvider>
      </QueryClientProvider>
    </>
    // </ThemeProvider>
  );
}

const GlobalStyled = createGlobalStyle`
body {
  width:100%;
  transition: all 0.2s ease-in-out;
}
body {
  --color-text: black;
  --color-background: #F8F9FA; 
    --bg-element1:white;
    --bg-element2:white;
    --bg-element3:white;
    --fixed-bg1:#242424;
    --fixed-color1:#242424;
    --primary1:#816BFF;
    --primary2:#6E58FF;
    /* --primary1:#772CE8; */
}

@media (prefers-color-scheme: dark) { //사용자 시스템이 다크모드일경우.
  body {
    --color-text: white;
    --color-background: #121212; 
    --bg-element1:#1E1E1E;
    --bg-element2:#1E1E1E;
    --bg-element3:#1E1C1C;
    --bg-element4:#303030;
  }
}
body[data-theme="light"]{
  --color-text:black;
  --color-background:#F8F9FA;
  --bg-element1:#f7f7f7;
  --bg-element2:#ecedee;
    --bg-element3:#d8d8d8;
    --bg-element4:#c9c9c9;
}
body[data-theme="dark"]{
  --color-text:white;
  --color-background:#121212;
  --bg-element1:#141414;
  --bg-element2:#1E1E1E;
  --bg-element3:#1E1C1C;
    --bg-element4:#303030;
}
body{
  color:var(--color-text);
  background:var(--color-background);
  .theme-bg-element1{
    background:var(--bg-element1);
  }
  .theme-bg-element2{
    background:var(--bg-element2);
  }
}
h1,h2,h3,h4,h5,h6 , a , input{
  color: inherit;
}

button{
  border :0;
}

html , body , #root{
  /* height:100%; */
  background-repeat:no-repeat;
  width:100%;
  height:100%;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif'; 
}
a, a:link, a:visited , a:hover , a:focus{
  text-decoration:none;
  color:unset
}
textarea{
  resize:none;
  /* border:none; */
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
    background-color: grey;
    /* border-radius: 10px; */
  }
  body::-webkit-scrollbar-track {
    background-color: #2f3542;
    /* border-radius: 10px; */
  }
`;

export default App;
