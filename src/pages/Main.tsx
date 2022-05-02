import React, { useLayoutEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/header/header";
import Profile from "./Profile";
import Home from "./Home";
import SignForm from "./SignForm";
import Feed from "./Feed";
import Group from "./Group";
import Search from "./Search";
import NewFeed from "../components/feed/NewFeed";
import Popular from "../components/feed/Popular";
import GroupFeed from "../components/feed/GroupFeed";
import GroupBody from "../components/group/groupDetail/groupMain/GroupBody";
import GroupMember from "../components/group/groupDetail/groupMain/GroupMember";
import SearchListGroup from "../components/search/SearchListGroup";
import SearchListPost from "../components/search/SearchListPost";
import SearchListUser from "../components/search/SearchListUser";
import useScroll from "../hook/useScroll";

function Main() {
  const [isSign, setIsSign] = useState(true);
  const [scrollY, topDirection] = useScroll();

  useLayoutEffect(() => {
    if (localStorage.getItem("theme") === null) {
      localStorage.setItem("theme", "light");
      document.body.dataset.theme = "light";
    }
    if (localStorage.getItem("theme") === "dark") {
      document.body.dataset.theme = "dark";
    }
    if (localStorage.getItem("theme") === "light") {
      document.body.dataset.theme = "light";
    }
  }, []);

  return (
    <BrowserRouter>
      {!isSign && <Header />}
      <MainWrapper isSign={isSign} scrollY={scrollY}>
        <Routes>
          {isSign ? (
            <Route index element={<SignForm setIsSign={setIsSign} />} />
          ) : (
            <>
              <Route index element={<Home />} />
              <Route path={`feed`} element={<Feed />}>
                <Route path={`newfeed`} element={<NewFeed />} />
                <Route path={`popular`} element={<Popular />} />
                <Route path={`groupfeed`} element={<GroupFeed />} />
              </Route>
              <Route path={`profile/:id`} element={<Profile />} />
              <Route path={`group/:_id`} element={<Group />}>
                <Route path="post" element={<GroupBody />} />
                <Route path={`member`} element={<GroupMember />} />
              </Route>
              <Route path={`/search`} element={<Search />}>
                <Route path={`group/:search`} element={<SearchListGroup />} />
                <Route path={`post/:search`} element={<SearchListPost />} />
                <Route path={`user/:search`} element={<SearchListUser />} />
              </Route>
              {/* <Route path={`/groupdetail/:_id/*`} element={<GroupDetail />} /> */}
              <Route path="*" element={<div>없는 페이지입니다</div>} />
            </>
          )}
        </Routes>
      </MainWrapper>
    </BrowserRouter>
  );
}
export default Main;

const MainWrapper = styled.div<{ isSign: boolean; scrollY: number }>`
  ${(props) => props.isSign && `height:100%;`}
  ${({ scrollY }) => (scrollY > 64 ? "margin-top: 64px" : "")};
`;
