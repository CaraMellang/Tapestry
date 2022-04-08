import React from "react";
import styled from "styled-components";
import ParantCommentItem from "./ParantCommentItem";

export interface ParantComment {
  _id: string;
  child_comment: string[];
  created_at: Date;
  like_count: number;
  owner_id: { _id: string; email: string; user_name: string; user_img: string };
  post_id: string;
  text: string;
  updated_at: Date | null;
}
export interface ChildComment {
  _id:string;
  post_id: string;
  parant_comment_id: string;
  owner_id: {
    _id: string;
    email: string;
    user_name: string;
    user_img: string;
  };
  text: string;
  like_count: number;
  created_at: Date;
  updated_at: Date | null;
}

interface CommentItemListProps {
  commentArr: ParantComment[];
  ownerId: string;
  postId:string
}

export default function CommentItemList({
  commentArr,
  ownerId,
  postId
}: CommentItemListProps) {
  return (
    <CommentItemListWrap>
      {commentArr.length > 0 &&
        commentArr.map((ele) => {
          return <ParantCommentItem key={ele._id} {...ele} ownerId={ownerId} postId={postId} />;
        })}
    </CommentItemListWrap>
  );
}

const CommentItemListWrap = styled.div``;
