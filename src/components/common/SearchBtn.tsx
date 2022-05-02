import React from "react";
import styled from "styled-components";
import { ReactComponent as SearchIcon } from "../static/svg/search.svg";

export default function SearchBtn() {
  return (
    <SearchBtnWrap>
      <div className="search-btn-back">
        <SearchIcon style={{ width: "1.125rem", height: "1.125rem" }} />
      </div>
    </SearchBtnWrap>
  );
}

const SearchBtnWrap = styled.div`
  height: 100%;
  .search-btn-back {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 0.5rem;
    cursor: pointer;
  }
`;
