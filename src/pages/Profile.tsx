import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ProfileBot from "../components/profile/ProfileBot";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileTop from "../components/profile/ProfileTop";

function Profile() {
  const selector = useSelector((state: any) => state.userSliceReducer);
  const params = useParams();
  console.log(params);
  return (
    <ProfileWrapper>
      <div>
        <h1>Profile</h1>
        <ProfileTop />
        <ProfileHeader />
        <ProfileBot />
        <div>{selector.username}</div>
        <div></div>
      </div>
    </ProfileWrapper>
  );
}

export default Profile;

const ProfileWrapper = styled.div`
  div {
    color: blue;
  }
`;
