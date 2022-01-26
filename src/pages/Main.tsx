import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/header/header";
import Profile from "./Profile";
import Home from "./Home";
import SignForm from "./SignForm";
import Feed from "./Feed";
import Group from "./Group";

function Main() {
  const [isSign, setIsSign] = useState(true);

  return (
    <BrowserRouter>
      {!isSign && <Header />}
      <MainWrapper>
        <Routes>
          {isSign ? (
            <Route path={`/*`} element={<SignForm setIsSign={setIsSign} />} />
          ) : (
            <>
              <Route path={`/*`} element={<Home />} />
              <Route path={`/feed/*`} element={<Feed />} />
              <Route path={`/profile/:id`} element={<Profile />} />
              <Route path={`/group/:_id`} element={<Group />} />
            </>
          )}
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
