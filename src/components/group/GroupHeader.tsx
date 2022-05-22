import React from "react";
import { NavLink, useParams } from "react-router-dom";
import styled from "styled-components";

export default function GroupHeader() {
  const { _id } = useParams();
  return (
    <GroupHeaderWrap className="theme-bg-element2">
      <NavLink
        to={`/group/${_id}/post`}
        style={({ isActive }) => ({
          color: isActive ? `var(--primary1)` : `inherit`,
          borderBottom: `2px solid ${
            isActive ? "var(--primary1)" : "var(--color-text)"
          }`,
        })}
      >
        게시글
      </NavLink>
      <NavLink
        to={`/group/${_id}/member`}
        style={({ isActive }) => ({
          color: isActive ? `var(--primary1)` : `inherit`,
          borderBottom: `2px solid ${
            isActive ? "var(--primary1)" : "var(--color-text)"
          }`,
        })}
      >
        멤버
      </NavLink>
    </GroupHeaderWrap>
  );
}

const GroupHeaderWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin: 1rem 0;
  padding: 1rem 0.5rem;
  border-radius: 0.5rem;
  a {
    padding-bottom: 1px;
  }
`;
