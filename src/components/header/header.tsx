import Form from "antd/lib/form/Form";
import { Input } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { deleteCookie } from "../../lib/cookie";
import SearchInput from "../common/SearchInput";
import { ReactComponent as FeedIcon } from "../static/svg/feedIcon.svg";
import useDesktop from "../../hook/useDesktop";
import SearchBtn from "../common/SearchBtn";
import UserProfile from "../common/UserProfile";

function Header() {
  const navigate = useNavigate();
  const selector = useSelector((state: any) => state.userSliceReducer);
  const isDesktop = useDesktop();
  // const { Search } = Input;

  console.log();
  const onSearch = (e: string) => {
    console.log("Search test", e);
    navigate(`/search/${e}/group`);
  };

  return (
    <HeaderWrap>
      <div>
        <Link className="header-item" to={`/`}>
          Tapestry
        </Link>
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
        <Link className="header-item" to={`/feed`}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {isDesktop ? (
              <div>새글피드</div>
            ) : (
              <FeedIcon
                style={{
                  width: "24px",
                  height: "24px",
                }}
              />
            )}
          </div>
        </Link>
        <NavLink
          className={"header-item"}
          to={`/profile/${selector.user.userId}`}
          style={({ isActive }) => ({
            color: isActive ? `green` : `inherit`,
          })}
        >
          프로파일
        </NavLink>
        {/* <Search /> */}
        <Link className="header-item search-item" to={`/search`}>
          <SearchBtn />
        </Link>
        <UserProfile />
        {/* <div
          className="theme-bg-element2 header-item"
          onClick={() => {
            deleteCookie("access_token");
            window.location.replace(`/`);
          }}
        >
          로그아웃
        </div> */}
      </div>
    </HeaderWrap>
  );
}
export default Header;

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1340px;
  height: 50px;
  align-items: center;
  margin: auto;
  .header-item {
    display: flex;
    align-items: center;
    padding: 0 0.5rem;
  }
  .search-item {
    padding: 0 3px;
    margin-right: 0.5rem;
    border-radius: 20px;
  }
  .search-item:hover {
    background: var(--fixed-bg1);
  }
  @media (max-width: 1440px) {
    width: 1024px;
  }
  @media (max-width: 1024px) {
    width: 100%;
    padding: 0 1rem;
  }
`;
