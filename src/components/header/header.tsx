import React from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";

function Header() {
  const navigate = useNavigate();

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
        to={`/group`}
        style={({ isActive }) => ({ color: isActive ? `green` : `black` })}
      >
        그룹
      </NavLink>
      <NavLink
        to={`/follow`}
        style={({ isActive }) => ({ color: isActive ? `green` : `black` })}
      >
        팔로우
      </NavLink>
    </HeaderWrap>
  );
}
export default Header;

const HeaderWrap = styled.div`
  color: black;
`;
