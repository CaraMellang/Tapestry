import React, { useState } from "react";
import styled from "styled-components";
import PostLayout from "../common/postItem/PostLayout";
import Loading from "../Loading";

export default function Popular() {
  return <PopularWrap>
    <PostLayout option="popularfeed" />
  </PopularWrap>
}

const PopularWrap = styled.div``
