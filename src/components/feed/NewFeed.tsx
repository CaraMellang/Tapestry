import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PostLayout from "../common/postItem/PostLayout";
import RecommendedGroup from "../common/recommendedGroup/RecommendedGroup";
import Loading from "../Loading";

export default function NewFeed() {
  return (
    <NewFeedWrap>
      <RecommendedGroup />
      <PostLayout option="newfeed" />
    </NewFeedWrap>
  );
}

const NewFeedWrap = styled.div`
display: flex;
position: relative;
width: 1200px;
margin: auto;`
