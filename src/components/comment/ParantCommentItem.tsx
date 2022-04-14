import React, { useEffect, useState } from "react";
import styled from "styled-components";
import client from "../../lib/api/client";
import ChildComLayout from "./ChildComLayout";
import { ParantComment } from "./CommentItemList";

interface ParantCommentItemProps extends ParantComment {
  ownerId: string;
  postId: string;
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
  postId,
}: ParantCommentItemProps) {
  const [isOwner, setIsOwner] = useState(false);
  const [isShowChild, setIsShowChild] = useState(false);

  const onClickDelete = async () => {
    //상위 컴포넌트, 레이아웃쪽에서 state를 관리하는게 더 좋을듯
    try {
      await client.delete(`/comment/parant`, { data: { comment_id: _id } });
      //부모댓글 재요청 작업필요
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (owner_id._id === ownerId) {
      setIsOwner(true);
    }
  }, []);
  console.log(child_comment);
  return (
    <ParantCommentItmeWrap>
      <img
        width={40}
        height={40}
        className="parantUserImg"
        style={{ borderRadius: "20px" }}
        src={owner_id.user_img}
      />
      <div
        style={{ width: "100%", boxSizing: "border-box", paddingLeft: "10px" }}
      >
        <span style={{ background: "gray" }}>{owner_id.user_name}</span>
        {isOwner && <span>⭐이 사람은 작성자 입니다⭐</span>}
        <button
          className="theme-bg-element2"
          style={{ cursor: "pointer" }}
          onClick={onClickDelete}
        >
          삭제
        </button>
        <div>{text}</div>
        <div
          style={{ color: "gray", cursor: "pointer" }}
          onClick={() => {
            setIsShowChild((prev) => !prev);
          }}
        >
          {isShowChild ? "답글 취소" : "답글 달기"}
        </div>
        <div>
          <ChildComLayout
            parantId={_id}
            postId={postId}
            isShowChild={isShowChild}
            parantOwnerName={owner_id.user_name}
            childComment={child_comment}
            childLength={child_comment.length}
            ownerId={ownerId}
          />
        </div>
      </div>
    </ParantCommentItmeWrap>
  );
}

const ParantCommentItmeWrap = styled.div`
  display: flex;
  background: #553f3f;
  .parantUserImg {
    margin-left: 5px;
    margin-top: 5px;
  }
`;
