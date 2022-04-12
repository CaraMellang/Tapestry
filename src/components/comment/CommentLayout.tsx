import React from "react";
import styled from "styled-components";
import CommentItemList, { ParantComment } from "./CommentItemList";
import WriteComment from "./WriteComment";

interface CommentLayoutProps{
  commentArr: ParantComment[] | undefined
  ownerId:string
  postId:string
  onParantReloading:()=>void
}

export default function CommentLayout({commentArr,ownerId,postId,onParantReloading}: CommentLayoutProps) {
  console.log(commentArr)
  return (
    <CommentLayoutWrap>
      <CommentItemList commentArr={commentArr} ownerId={ownerId} postId={postId}  />
      <WriteComment postId={postId} onReloading={onParantReloading} />
    </CommentLayoutWrap>
  );
}

const CommentLayoutWrap = styled.section``;
