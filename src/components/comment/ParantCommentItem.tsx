import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ParantComment } from "./CommentItemList";

interface ParantCommentItemProps extends ParantComment {
  ownerId: string;
}

export default function ParantCommentItem({
  _id,
  child_comment,
  created_at,
  like_count,
  owner_id,
  post_id,
  text,
  updated_at,
  ownerId,
}: ParantCommentItemProps) {
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    console.log("뭐임", owner_id._id, ownerId);
    if (owner_id._id === ownerId) {
      setIsOwner(true);
    }
  }, []);
  return (
    <ParantCommentItmeWrap>
      <img
        width={40}
        height={40}
        style={{ borderRadius: "20px" }}
        src={owner_id.user_img}
      />
      <div>
        <span style={{ background: "gray" }}>{owner_id.user_name}</span>
        {isOwner && <span>⭐이 사람은 작성자 입니다⭐</span>}
        <div>{text}</div>
      </div>
    </ParantCommentItmeWrap>
  );
}

const ParantCommentItmeWrap = styled.div`
  display: flex;
  align-items: center;
  background: #553f3f;
`;
