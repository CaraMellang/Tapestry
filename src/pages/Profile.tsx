import { Switch } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ProfileBot from "../components/profile/ProfileBot";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileTop from "../components/profile/ProfileTop";
import { theme } from "../lib/theme";

function Profile() {
  const selector = useSelector((state: any) => state.userSliceReducer);
  const params = useParams();
  const [switchToggle, setswitchToggle] = useState(
    localStorage.getItem("theme") === "dark" ? true : false
  );

  const onSwitchChange = (toggle: boolean) => {
    console.log("ㅎㅇㅎㅇ", toggle);
    if (toggle === true) {
      localStorage.setItem("theme", "dark");
      document.body.style.background = theme.darkTheme.bgColor;
      document.body.style.color = theme.darkTheme.textColor;
      setswitchToggle(true);
    }
    if (toggle === false) {
      localStorage.setItem("theme", "light");
      document.body.style.background = theme.lightTheme.bgColor;
      document.body.style.color = theme.lightTheme.textColor;
      setswitchToggle(false);
    }
  };
  console.log(params);
  return (
    <ProfileWrapper>
      <div>
        <h1>Profile</h1>
        <ProfileTop />
        <ProfileHeader />
        <ProfileBot />
        <div>{selector.user.username}</div>
        <div>
          다크모드 활성화
          <Switch defaultChecked={switchToggle} onChange={onSwitchChange} />
        </div>
        <div></div>
      </div>
    </ProfileWrapper>
  );
}

export default Profile;

const ProfileWrapper = styled.div``;
