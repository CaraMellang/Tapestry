import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PostLayout from "../common/postItem/PostLayout";
import Loading from "../Loading";

export default function NewFeed() {
  // const [loading, setLoading] = useState(true);

  // if (loading) {
  //   return <Loading />;
  // }
  return (
    <NewFeedWrap>
      <PostLayout />
    </NewFeedWrap>
  );
}

const NewFeedWrap = styled.div``
