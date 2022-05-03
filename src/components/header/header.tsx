import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as FeedIcon } from "../static/svg/feedIcon.svg";
import useDesktop from "../../hook/useDesktop";
import SearchBtn from "../common/SearchBtn";
import UserProfile from "../common/UserProfile";
import useScroll from "../../hook/useScroll";

function Header() {
  const navigate = useNavigate();
  const isDesktop = useDesktop();
  const [scrollY, topDirection] = useScroll();

  return (
    <HeaderWrap scrollY={scrollY}>
      <div className="header-wrap">
        <div>
          <Link className="header-item" to={`/`}>
            Tapestry
          </Link>
        </div>
        <div style={{ display: "flex" }}>
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
          <Link className="header-item search-item" to={`/search`}>
            <SearchBtn />
          </Link>
          <UserProfile />
        </div>
      </div>
    </HeaderWrap>
  );
}
export default Header;

const HeaderWrap = styled.div<{ scrollY: number }>`
  position: ${({ scrollY }) => (scrollY >= 64 ? "fixed" : "static")};
  top: 0;
  width: 100%;
  background: var(--bg-element2);
  z-index: 22;
  .header-wrap {
    display: flex;
    justify-content: space-between;
    width: 1340px;
    height: 4rem;
    align-items: center;
    margin: auto;
  }
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
    padding: 0 1rem;
    .header-wrap {
      width: 100%;
    }
  }
  @media (max-width: 1024px) {
    width: 100%;
  }
`;
