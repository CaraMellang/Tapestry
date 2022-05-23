import React from "react";
import { Outlet, Route, Routes, useParams } from "react-router-dom";
import styled from "styled-components";
import SearchInput from "../components/common/SearchInput";
import SearchHeader from "../components/search/SearchHeader";
import SearchListGroup from "../components/search/SearchListGroup";
import SearchListPost from "../components/search/SearchListPost";
import SearchListUser from "../components/search/SearchListUser";
import media from "../lib/media";

export default function Search() {
  return (
    <SearchWrap>
      <SearchInput />
      <SearchHeader />
      <Outlet />
      {/* <SearchList /> */}
    </SearchWrap>
  );
}

const SearchWrap = styled.div`
  width: 1024px;
  margin: auto;
  ${media.large} {
    width: 100%;
    padding: 0 1rem;
  }
`;
