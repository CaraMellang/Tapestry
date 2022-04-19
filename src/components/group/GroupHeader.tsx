import React from "react";
import { NavLink, useParams } from "react-router-dom";
import styled from "styled-components";

export default function GroupHeader() {
  const { _id } = useParams();
  return (
    <GroupHeaderWrap>
      <div>그룹에어리어헤더</div>
      <div style={{ textAlign: "center" }}>
        <NavLink
          to={`/group/${_id}/post`}
          style={({ isActive }) => ({
            color: isActive ? `green` : `inherit`,
          })}
        >
          게시글
        </NavLink>
        <NavLink
          to={`/group/${_id}/member`}
          style={({ isActive }) => ({
            color: isActive ? `green` : `inherit`,
          })}
        >
          멤버
        </NavLink>
      </div>
    </GroupHeaderWrap>
  );
}

const GroupHeaderWrap = styled.div``;
