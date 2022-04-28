import Form from "antd/lib/form/Form";
import { Input } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { deleteCookie } from "../../lib/cookie";
import Search from "../common/Search";
import { ReactComponent as FeedIcon } from "../static/svg/feedIcon.svg";

function Header() {
  const navigate = useNavigate();
  const selector = useSelector((state: any) => state.userSliceReducer);
  // const { Search } = Input;

  console.log();
  const onSearch = (e: string) => {
    console.log("Search test", e);
    navigate(`/search/${e}/group`);
  };

  return (
    <HeaderWrap>
      <div>
        <Link to={`/`}>Tapestry</Link>
      </div>
      {/* <div style={{ width: "33.3%" }}>Tapestry</div> */}
      {/* <Search placeholder="input search text" onSearch={onSearch} enterButton /> */}
      <div style={{ display: "flex" }}>
        {/* <NavLink
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
        </NavLink> */}
        <Link to={`/feed`}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <FeedIcon
              style={{
                width: "30px",
                height: "30px",
              }}
            />
            <div>새글피드</div>
          </div>
        </Link>
        <NavLink
          to={`/profile/${selector.user.userId}`}
          style={({ isActive }) => ({
            color: isActive ? `green` : `inherit`,
          })}
        >
          프로파일
        </NavLink>
        <Search />
        <div
          className="theme-bg-element2"
          onClick={() => {
            deleteCookie("access_token");
            window.location.replace(`/`);
          }}
        >
          로그아웃
        </div>
      </div>
    </HeaderWrap>
  );
}
export default Header;

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1340px;
  margin: auto;
  @media (max-width: 1440px) {
    width: 924px;
  }
`;
