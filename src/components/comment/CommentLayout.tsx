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
  // console.log("저 문제있나요", commentArr, firstCommentArr);

  const showParantComment = async () => {
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
    showParantComment();
  };

  useEffect(()=>{
    showParantComment()
  },[])

  return (
    <CommentLayoutWrap>
      <CommentItemList
        commentArr={commentArr}
        ownerId={ownerId}
        postId={postId}
      />
      <WriteComment postId={postId} onReloading={onParantReloading} />
    </CommentLayoutWrap>
  );
}

const CommentLayoutWrap = styled.section``;
