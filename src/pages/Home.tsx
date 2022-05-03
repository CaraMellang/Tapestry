import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CreateGroupFloat from "../components/home/CreateGroupFloat";
import GroupList from "../components/home/GroupList";
import GroupListHeader from "../components/home/GroupListHeader";
import client from "../lib/api/client";

function Home() {
  async function get() {
    try {
      const dd = await client.post(`/auth/test`, ".");
      console.log(dd.data);
    } catch (err) {
      console.log("실패");
    }
  }
  useEffect(() => {
    get();
  }, []);
  return (
    <HomeWrap>
      {/* <h1>home</h1>
      <GroupListHeader /> */}
      <CreateGroupFloat />
      <GroupList />
    </HomeWrap>
  );
}

const HomeWrap = styled.div`
  padding: 0 4rem;
`;

export default Home;
