import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

export default function FeedHeader() {
  return (
    <FeedHeaderWrap>
      <NavLink
        to={`/feed/newfeed`}
        style={({ isActive }) => ({
          background: isActive ? `var(--primary1)` : `inherit`,
          color: isActive ? `white` : `inherit`,
        })}
      >
        새글
      </NavLink>
      <NavLink
        to={`/feed/popular`}
        style={({ isActive }) => ({
          background: isActive ? `var(--primary1)` : `inherit`,
          color: isActive ? `white` : `inherit`,
        })}
      >
        인기글
      </NavLink>
      <NavLink
        to={`/feed/groupfeed`}
        style={({ isActive }) => ({
          background: isActive ? `var(--primary1)` : `inherit`,
          color: isActive ? `white` : `inherit`,
        })}
      >
        내 그룹
      </NavLink>
    </FeedHeaderWrap>
  );
}

const FeedHeaderWrap = styled.div`
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
