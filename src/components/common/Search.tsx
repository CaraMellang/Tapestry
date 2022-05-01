import React, { KeyboardEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useInput from "../../hook/useInput";
import { ReactComponent as SearchIcon } from "../static/svg/search.svg";

export default function Search() {
  const [text, onChangeText, setText] = useInput("");
  const navigate = useNavigate();
  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onClickSearch();
    }
  };

  const onClickSearch = () => {
    navigate(`/search/${text}/group`);
    setText("");
  };

  return (
    <SearchWrap>
      <input
        type={"text"}
        onChange={onChangeText}
        value={text}
        onKeyPress={onKeyPress}
      />
      <div style={{ display: "flex", alignItems: "center" }}>
        <SearchIcon
          style={{ width: "1.125rem", height: "1.125rem", cursor: "pointer" }}
          onClick={onClickSearch}
        />
      </div>
    </SearchWrap>
  );
}

const SearchWrap = styled.div`
  display: flex;
  background: var(--bg-element2);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  input {
    width: 100%;
    background: var(--bg-element2);
    color: var(--color-text);
    border: 0;
    margin-right: 0.5rem;
  }
`;
