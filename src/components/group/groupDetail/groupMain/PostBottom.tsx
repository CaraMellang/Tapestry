import React from "react";
import styled from "styled-components";
import { Post } from "../../../../modules/redux/Group";
import CommentLayout from "../../../comment/CommentLayout";
import LikeBtn from "../../../common/LikeBtn";

interface PostBottomProps {
  item: Post;
  isLike: boolean;
  onClickLike: () => void;
  onClickDislike: () => void;
  showComment: boolean;
  setShowComment: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PostBottom({
  item,
  isLike,
  onClickLike,
  onClickDislike,
  showComment,
  setShowComment,
}: PostBottomProps) {
  return (
    <PostBottomWrap>
      <div className="btns-wrap">
        <div
          style={{
            display: "flex",
            width: "50%",
            borderRight: "1px solid white",
            borderTop: "2px solid white",
            justifyContent: "center",
            padding: "0.5rem",
          }}
        >
          <LikeBtn
            isLike={isLike}
            onClickLike={onClickLike}
            onClickDislike={onClickDislike}
          />
          <span>{item.like_count}</span>
        </div>
        <button
          style={{
            width: "50%",
            background: "var(--bg-element4)",
            borderLeft: "1px solid white",
            borderTop: "2px solid white",
            padding: "0.5rem",
          }}
          onClick={() => {
            setShowComment((prev) => !prev);
          }}
        >
          댓글
          {/* (댓글 수 {item.comment.length}) */}
        </button>
      </div>
        {showComment && (
          <CommentLayout
            firstCommentArr={item.comment}
            ownerId={item.owner_id._id}
            postId={item._id}
          />
        )}
    </PostBottomWrap>
  );
}

const PostBottomWrap = styled.div`
  .btns-wrap {
    display: flex;
  }
`;
