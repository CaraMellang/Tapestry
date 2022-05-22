import { Switch } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ProfileHeader from "./ProfileHeader";
import ProfileImage from "./ProfileImage";
import ProfileInfo from "./ProfileInfo";
import SettingBottom from "./SettingBottom";
import SettingTop from "./SettingTop";

export default function ProfileMain() {
  const params = useParams();

  console.log(params);
  return (
    <ProfileMainWrap>
      <div>
        {/* <ProfileHeader /> */}
        {/* <ProfileImageCrop /> */}
        <SettingTop />
        <SettingBottom />
      </div>
    </ProfileMainWrap>
  );
}

const ProfileMainWrap = styled.main`
  width: 768px;
  margin: auto;
  margin-top: 3rem;
`;
