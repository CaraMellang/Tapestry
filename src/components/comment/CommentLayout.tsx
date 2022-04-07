import React from "react";
import styled from "styled-components";
import CommentItemList, { ParantComment } from "./CommentItemList";
import WriteComment from "./WriteComment";

interface CommentLayoutProps{
  commentArr: ParantComment[]
  ownerId:string
  postId:string
}

export default function CommentLayout({commentArr,ownerId,postId}: CommentLayoutProps) {
  console.log(commentArr)
  return (
    <CommentLayoutWrap>
      <CommentItemList commentArr={commentArr} ownerId={ownerId} />
      <WriteComment postId={postId} />
    </CommentLayoutWrap>
  );
}

const CommentLayoutWrap = styled.section``;
