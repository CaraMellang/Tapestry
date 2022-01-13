import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

export default function FeedHeader() {
  return (
    <FeedHeaderWrap>
      <NavLink
        to={`/feed/newfeed`}
        style={({ isActive }) => ({ color: isActive ? `green` : `black` })}
      >
        새글
      </NavLink>
      <NavLink
        to={`/feed/popular`}
        style={({ isActive }) => ({ color: isActive ? `green` : `black` })}
      >
        인기글
      </NavLink>
      <NavLink
        to={`/feed/groupfeed`}
        style={({ isActive }) => ({ color: isActive ? `green` : `black` })}
      >
        내 그룹
      </NavLink>
    </FeedHeaderWrap>
  );
}

const FeedHeaderWrap = styled.div``;
