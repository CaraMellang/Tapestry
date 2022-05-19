import React from "react";
import styled from "styled-components";
import ProfileMain from "../components/profile/ProfileMain";

function Profile() {
  return (
    <ProfileWrapper>
      <ProfileMain />
    </ProfileWrapper>
  );
}

export default Profile;

const ProfileWrapper = styled.div``;
