import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { deleteCookie } from "../../lib/cookie";

interface UserProfileDropDownProps {
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UserProfileDropDown({
  setIsActive,
}: UserProfileDropDownProps) {
  const userId = useSelector(
    (state: any) => state.userSliceReducer.user.userId
  );

  const onClickClose = useCallback(() => {
    setIsActive(false);
  }, [setIsActive]);

  return (
    <UserProfileDropDownWrap>
      <div className="dropdown-menu-item" onClick={onClickClose}>
        하잉~
      </div>
      <Link
        to={`/wroted`}
        className="dropdown-menu-item"
        onClick={onClickClose}
      >
        내글 보기
      </Link>
      <Link
        to={`/profile/${userId}`}
        className="dropdown-menu-item"
        onClick={onClickClose}
      >
        설정
      </Link>
      <div
        className="dropdown-menu-item"
        onClick={() => {
          deleteCookie("access_token");
          window.location.replace(`/`);
        }}
      >
        로그아웃
      </div>
    </UserProfileDropDownWrap>
  );
}

const UserProfileDropDownWrap = styled.div`
  position: absolute;
  width: 12rem;
  right: 0;
  margin-top: 1rem;
  background: var(--bg-element2);
  z-index: 22;
  .dropdown-menu-item {
    display: block;
    padding: 0.75rem 1rem;
    transition: none;
  }
  .dropdown-menu-item:hover {
    color: var(--primary1);
  }
`;
