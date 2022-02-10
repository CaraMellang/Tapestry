import React, { useState } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import styled from "styled-components";
import SearchHeader from "../components/search/SearchHeader";
import SearchListGroup from "../components/search/SearchListGroup";
import SearchListPost from "../components/search/SearchListPost";
import SearchListUser from "../components/search/SearchListUser";

export default function Search() {
  const [searchType, setSearchType] = useState("group");
  return (
    <SearchWrap>
      <SearchHeader setSearchType={setSearchType} />
      <Routes>
        <Route path={`group`} element={<SearchListGroup searchType={searchType} />} />
        <Route path={`post`} element={<SearchListPost searchType={searchType} />} />
        <Route path={`user`} element={<SearchListUser searchType={searchType} />} />
      </Routes>
      {/* <SearchList /> */}
    </SearchWrap>
  );
}

const SearchWrap = styled.div``;
