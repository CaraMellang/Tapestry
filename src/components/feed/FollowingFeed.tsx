import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import MyGroupList from "../common/myGroupList/MyGroupList";
import PostLayout from "../common/postItem/PostLayout";

export default function FollowingFeed() {
  //팔로워 피드로 바뀔예정.
  return (
    <FollowerFeedWrap>
      <MyGroupList />
      <PostLayout option="followingfeed" />
    </FollowerFeedWrap>
  );
}

const FollowerFeedWrap = styled.div`
  display: flex;
  position: relative;
  width: 1200px;
  margin: auto;
`;
