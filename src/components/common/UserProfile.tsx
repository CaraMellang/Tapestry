import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import UserProfileDropDown from "./UserProfileDropDown";

export default function UserProfile() {
  const [isActive, setIsActive] = useState(false);
  const profileRef = useRef(null);
  const userImg = useSelector(
    (state: any) => state.userSliceReducer.user.user_img
  );

  const onClickOutSide = () => {
    if (profileRef.current !== null && isActive === true) {
      setIsActive(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", onClickOutSide);
    return () => {
      window.removeEventListener("click", onClickOutSide);
    };
  }, [isActive, profileRef]);

  return (
    <UserProfileWrap ref={profileRef}>
      <div style={{ cursor: "pointer" }}>
        <div
          className="profile-img-area"
          onClick={() => setIsActive((prev) => !prev)}
        >
          <img src={userImg} />
          <span className="profile-dropdown-caret"></span>
        </div>
        {isActive && <UserProfileDropDown setIsActive={setIsActive} />}
      </div>
    </UserProfileWrap>
  );
}

const UserProfileWrap = styled.div`
  position: relative;
  height: 100%;
  .profile-img {
    height: 100%;
  }
  .profile-img-area {
    display: flex;
    align-items: center;
  }
  img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
  }
  .profile-dropdown-caret {
    margin-left: 0.5rem;
    border-style: solid;
    border-width: 5px 5px 0;
    border-right-color: transparent;
    border-bottom-color: transparent;
    border-left-color: transparent;
  }
`;
