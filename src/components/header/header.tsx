import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";

function Header() {
  const navigate = useNavigate();
  const selector = useSelector((state: any) => state.userSliceReducer);

  console.log();

  return (
    <HeaderWrap>
      <NavLink
        to={`/`}
        style={({ isActive }) => ({ color: isActive ? `green` : `black` })}
      >
        메인~
      </NavLink>
      <NavLink
        to={`/feed`}
        style={({ isActive }) => ({ color: isActive ? `green` : `black` })}
      >
        피드
      </NavLink>
      <NavLink
        to={`/profile/${selector.user.userId}`}
        style={({ isActive }) => ({ color: isActive ? `green` : `black` })}
      >
        프로파일
      </NavLink>
    </HeaderWrap>
  );
}
export default Header;

const HeaderWrap = styled.div`
  color: black;
`;
