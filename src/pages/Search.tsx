import React, { useState } from "react";
import { Outlet, Route, Routes, useParams } from "react-router-dom";
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
      <Outlet />
      {/* <SearchList /> */}
    </SearchWrap>
  );
}

const SearchWrap = styled.div``;
