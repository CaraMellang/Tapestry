import React from "react";
import { NavLink, useParams } from "react-router-dom";
import styled from "styled-components";

interface SearchHeaderProps {
  setSearchType: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchHeader() {
  const { search } = useParams();
  return (
    <SearchHeaderWrap>
      <NavLink
        to={`group/${search}`}
        style={({ isActive }) => ({
          background: isActive ? `var(--primary1)` : `inherit`,
          color: isActive ? `white` : `inherit`,
        })}
      >
        그룹
      </NavLink>
      <NavLink
        to={`post/${search}`}
        style={({ isActive }) => ({
          background: isActive ? `var(--primary1)` : `inherit`,
          color: isActive ? `white` : `inherit`,
        })}
      >
        게시글
      </NavLink>
      <NavLink
        to={`user/${search}`}
        style={({ isActive }) => ({
          background: isActive ? `var(--primary1)` : `inherit`,
          color: isActive ? `white` : `inherit`,
        })}
      >
        사용자
      </NavLink>
    </SearchHeaderWrap>
  );
}

const SearchHeaderWrap = styled.div`
  margin: 1rem 0;
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  a {
    width: 5rem;
    text-align: center;
    padding: 0.25rem 1rem;
    border-radius: 1rem;
    transition: all 0.3s;
  }
`;
