import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import MyGroupList from "../common/myGroupList/MyGroupList";
import PostLayout from "../common/postItem/PostLayout";

export default function GroupFeed() {
  return (
    <GroupFeedWrap>
      <MyGroupList />
      <PostLayout option="groupfeed" />
    </GroupFeedWrap>
  );
}

const GroupFeedWrap = styled.div`
  display: flex;
  position: relative;
  width: 1200px;
  margin: auto;
`;
