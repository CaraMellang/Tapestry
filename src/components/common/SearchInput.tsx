import React, {
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useInput from "../../hook/useInput";
import { ReactComponent as SearchIcon } from "../static/svg/search.svg";

export default function SearchInput() {
  const [text, onChangeText, setText] = useInput("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const navigate = useNavigate();
  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onClickSearch();
    }
  };

  const onClickSearch = () => {
    navigate(`/search/group/${text}`);
    setText("");
  };

  return (
    <SearchInputWrap isFocus={isFocus}>
      <input
        type={"text"}
        onChange={onChangeText}
        value={text}
        onKeyPress={onKeyPress}
        onFocus={() => {
          setIsFocus(true);
        }}
        onBlur={() => {
          setIsFocus(false);
        }}
        ref={inputRef}
      />
      <div style={{ display: "flex", alignItems: "center" }}>
        <SearchIcon
          style={{
            // width: "1.125rem",
            // height: "1.125rem",
            cursor: "pointer",
          }}
          onClick={onClickSearch}
        />
      </div>
    </SearchInputWrap>
  );
}

const SearchInputWrap = styled.div<{ isFocus: boolean }>`
  display: flex;
  background: var(--bg-element2);
  padding: 0.25rem 0.75rem;
  outline: ${({ isFocus }) => (isFocus ? `1px solid white` : 0)};
  border-radius: 2rem;
  max-width: 1024px;
  margin: 2rem auto;
  padding: 0 2rem;
  box-sizing: border-box;
  transition: outline 0.2s ease-in-out;
  input {
    width: 100%;
    height: 50px;
    background: var(--bg-element2);
    color: var(--color-text);
    border: 0;
    margin-right: 0.5rem;
  }
  input:focus {
    border: 1px solid var(white);
  }
`;
