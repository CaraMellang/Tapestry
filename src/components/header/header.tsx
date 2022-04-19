import Form from "antd/lib/form/Form";
import { Input } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { deleteCookie } from "../../lib/cookie";

function Header() {
  const navigate = useNavigate();
  const selector = useSelector((state: any) => state.userSliceReducer);
  const { Search } = Input;

  console.log();
  const onSearch = (e: string) => {
    console.log("Search test", e);
    navigate(`/search/${e}/group`);
  };

  return (
    <HeaderWrap>
      <Search placeholder="input search text" onSearch={onSearch} enterButton />
      <NavLink
        to={`/`}
        style={({ isActive }) => ({
          color: isActive ? `green` : `inherit`,
        })}
      >
        메인~
      </NavLink>
      <NavLink
        to={`/feed`}
        style={({ isActive }) => ({
          color: isActive ? `green` : `inherit`,
        })}
      >
        피드
      </NavLink>
      <NavLink
        to={`/profile/${selector.user.userId}`}
        style={({ isActive }) => ({
          color: isActive ? `green` : `inherit`,
        })}
      >
        프로파일
      </NavLink>
      <div
        className="theme-bg-element2"
        onClick={() => {
          deleteCookie("access_token");
          window.location.replace(`/`);
        }}
      >
        로그아웃
      </div>
    </HeaderWrap>
  );
}
export default Header;

const HeaderWrap = styled.div``;
