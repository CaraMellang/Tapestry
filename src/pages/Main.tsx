import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/header/header";
import Follow from "./Follow";
import Group from "./Group";
import Home from "./Home";
import SignForm from "./SignForm";

function Main() {
  const [isSign, setIsSign] = useState(true);

  return (
    <BrowserRouter>
      {!isSign && <Header />}
      <MainWrapper>
        <Routes>
          {isSign  ? (
            <Route path={`/*`} element={<SignForm setIsSign={setIsSign} />} />
          ) : (
            <>
              <Route path={`/*`} element={<Home />} />
              <Route path={`/group`} element={<Group />} />
              <Route path={`/follow`} element={<Follow />} />
            </>
          )}
          {/* <Header /> */}
        </Routes>
      </MainWrapper>
    </BrowserRouter>
  );
}
export default Main;

const MainWrapper = styled.div`
  div {
    /* color: red; */
  }
`;
