import React from "react";
import styled from "styled-components";
import { Post } from "../../../modules/redux/Group";
import CommentLayout from "../../comment/CommentLayout";
import LikeBtn from "../LikeBtn";

interface PostLowerBodyProps {
  item: Post;
  isLike: boolean;
  onClickLike: () => void;
  onClickDislike: () => void;
  showComment: boolean;
  setShowComment: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PostLowerBody({
  item,
  isLike,
  onClickLike,
  onClickDislike,
  showComment,
  setShowComment,
}: PostLowerBodyProps) {
  return (
    <PostLowerBodyWrap>
      <div className="btns-wrap">
        <div
          style={{
            display: "flex",
            width: "50%",
            borderRight: "1px solid white",
            borderTop: "2px solid white",
            background: "var(--bg-element2)",
            justifyContent: "center",
            padding: "0.5rem",
          }}
        >
          <LikeBtn
            isLike={isLike}
            onClickLike={onClickLike}
            onClickDislike={onClickDislike}
            likeCount={item.like_count}
          />
        </div>
        <button
          style={{
            width: "50%",
            background: "var(--bg-element2)",
            borderLeft: "1px solid white",
            borderTop: "2px solid white",
            padding: "0.5rem",
            cursor: "pointer",
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
        <div>댓글기능을 현재는 사용하실수 없습니다. 그룹에 직접 방문해 주세요.</div>
        // <CommentLayout
        //   firstCommentArr={item.comment}
        //   ownerId={item.owner_id._id}
        //   postId={item._id}
        // />
      )}
    </PostLowerBodyWrap>
  );
}

const PostLowerBodyWrap = styled.section`
  .btns-wrap {
    display: flex;
  }
`;
