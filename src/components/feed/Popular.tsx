import React, { useState } from "react";
import styled from "styled-components";
import PostLayout from "../common/postItem/PostLayout";
import RecommendedGroup from "../common/recommendedGroup/RecommendedGroup";
import Loading from "../Loading";

export default function Popular() {
  return (
    <PopularWrap>
      <RecommendedGroup />
      <PostLayout option="popularfeed" />
    </PopularWrap>
  );
}

const PopularWrap = styled.div`
  display: flex;
  position: relative;
  width: 1200px;
  margin: auto;
`;
