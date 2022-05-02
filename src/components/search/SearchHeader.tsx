import React from "react";
import { NavLink, useParams } from "react-router-dom";
import styled from "styled-components";

interface SearchHeaderProps {
  setSearchType: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchHeader({ setSearchType }: SearchHeaderProps) {
  const { search } = useParams();
  return (
    <SearchHeaderWrap>
      <h1>search hedaer</h1>
      <NavLink
        to={`group/${search}`}
        style={({ isActive }) => ({
          color: isActive ? `green` : `inherit`,
        })}
        onClick={() => {
          setSearchType("group");
        }}
      >
        그룹
      </NavLink>
      <NavLink
        to={`post/${search}`}
        style={({ isActive }) => ({
          color: isActive ? `green` : `inherit`,
        })}
        onClick={() => {
          setSearchType("post");
        }}
      >
        게시글
      </NavLink>
      <NavLink
        to={`user/${search}`}
        style={({ isActive }) => ({
          color: isActive ? `green` : `inherit`,
        })}
        onClick={() => {
          setSearchType("user");
        }}
      >
        사용자
      </NavLink>
    </SearchHeaderWrap>
  );
}

const SearchHeaderWrap = styled.div``;
