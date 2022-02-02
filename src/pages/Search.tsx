import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import SearchHeader from "../components/search/SearchHeader";
import SearchList from "../components/search/SearchList";

export default function Search() {
  const [searchType, setSearchType] = useState("group");
  console.log(searchType);
  return (
    <SearchWrap>
      <SearchHeader setSearchType={setSearchType} />
      <SearchList />
    </SearchWrap>
  );
}

const SearchWrap = styled.div``;
