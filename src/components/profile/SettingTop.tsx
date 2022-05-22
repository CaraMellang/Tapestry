import React from "react";
import styled from "styled-components";
import ProfileImage from "./ProfileImage";
import ProfileInfo from "./ProfileInfo";

export default function SettingTop() {
  return (
    <SettingTopWrap>
      <ProfileImage />
      <ProfileInfo />
    </SettingTopWrap>
  );
}

const SettingTopWrap = styled.section`
  display: flex;
`;
