import { Switch } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ProfileBot from "../components/profile/ProfileBot";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileInfo from "../components/profile/ProfileInfo";
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
      document.body.dataset.theme = "dark";

      setswitchToggle(true);
    }
    if (toggle === false) {
      localStorage.setItem("theme", "light");
      document.body.dataset.theme = "light";

      setswitchToggle(false);
    }
  };

  console.log(params);
  return (
    <ProfileWrapper>
      <div>
        <div style={{ fontSize: "36px", fontWeight: "bold" }}>Profile</div>
        <ProfileTop />
        <ProfileHeader />
        <ProfileBot />
        <div><ProfileInfo /></div>
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
