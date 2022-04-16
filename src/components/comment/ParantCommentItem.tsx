import React, { useEffect, useState } from "react";
import styled from "styled-components";
import client from "../../lib/api/client";
import ChildComLayout from "./ChildComLayout";
import { ParantComment } from "./CommentItemList";

interface ParantCommentItemProps extends ParantComment {
  ownerId: string;
  postId: string;
  onParantReloading: () => void;
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
  onParantReloading,
}: ParantCommentItemProps) {
  const [isOwner, setIsOwner] = useState(false);
  const [isShowChild, setIsShowChild] = useState(false);

  const onClickDelete = async () => {
    const isDelete = window.confirm("정말 삭제하시겠습니까?")
    if(!isDelete) return
    try {
      await client.delete(`/comment/parant/delete`, { data: { comment_id: _id } });
      onParantReloading();
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
        <div style={{ color: "gray" }}>{_id}</div>
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
