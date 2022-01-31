import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import SearchHeader from "../components/search/SearchHeader";
import SearchList from "../components/search/SearchList";

export default function Search() {
  const { search } = useParams();
  console.log(search);
  return (
    <SearchWrap>
      <SearchHeader />
      <h1>검색결과: {search}</h1>
      <SearchList />
    </SearchWrap>
  );
}

const SearchWrap = styled.div``;
