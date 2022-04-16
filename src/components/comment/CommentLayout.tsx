import React, { useEffect, useState } from "react";
import styled from "styled-components";
import client from "../../lib/api/client";
import CommentItemList, { ParantComment } from "./CommentItemList";
import WriteComment from "./WriteComment";

interface CommentLayoutProps {
  firstCommentArr: ParantComment[];
  ownerId: string;
  postId: string;
}

export default function CommentLayout({
  firstCommentArr,
  ownerId,
  postId,
}: CommentLayoutProps) {
  const [commentArr, setCommentArr] =
    useState<ParantComment[]>(firstCommentArr);

  const requestParantComment = async () => {
    try {
      const {
        data: { data },
      } = await client.post(`/comment/parant/read`, { post_id: postId });
      setCommentArr(data);
    } catch (err) {
      console.log(err);
    }
  };
  const onParantReloading = () => {
    requestParantComment();
  };

  useEffect(()=>{
    requestParantComment()
  },[])

  return (
    <CommentLayoutWrap>
      <CommentItemList
        commentArr={commentArr}
        ownerId={ownerId}
        postId={postId}
        onParantReloading={onParantReloading}
      />
      <WriteComment postId={postId} onReloading={onParantReloading} />
    </CommentLayoutWrap>
  );
}

const CommentLayoutWrap = styled.section``;
