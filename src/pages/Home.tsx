import React, { useState } from "react";
import styled from "styled-components";
import GroupList from "../components/home/GroupList";
import GroupListHeader from "../components/home/GroupListHeader";

function Home() {
  return (
    <HomeWrap>
      <h1>home</h1>
      <GroupListHeader />
      <GroupList />
    </HomeWrap>
  );
}

const HomeWrap = styled.div``;

export default Home;
