import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

interface SearchHeaderProps {
  setSearchType: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchHeader({ setSearchType }: SearchHeaderProps) {
  return (
    <SearchHeaderWrap>
      <h1>search hedaer</h1>
      <NavLink
        to={`group`}
        style={({ isActive }) => ({ color: isActive ? `green` : `black` })}
        onClick={() => {
          setSearchType("group");
        }}
      >
        그룹
      </NavLink>
      <NavLink
        to={`post`}
        style={({ isActive }) => ({ color: isActive ? `green` : `black` })}
        onClick={() => {
          setSearchType("post");
        }}
      >
        게시글
      </NavLink>
      <NavLink
        to={`user`}
        style={({ isActive }) => ({ color: isActive ? `green` : `black` })}
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
