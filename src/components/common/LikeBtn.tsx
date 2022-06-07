import React from "react";
import styled from "styled-components";

interface LikeBtnProps {
  isLike: boolean;
  onClickLike: () => void;
  onClickDislike: () => void;
  likeCount: number;
}

export default function LikeBtn({
  isLike,
  onClickLike,
  onClickDislike,
  likeCount,
}: LikeBtnProps) {
  return (
    <LikeBtnWrap>
      {isLike ? (
        <button onClick={onClickDislike}>❤️ {likeCount}</button>
      ) : (
        <button onClick={onClickLike}>🤍 {likeCount}</button>
      )}
    </LikeBtnWrap>
  );
}

const LikeBtnWrap = styled.div`
  width: 100%;
  button {
    width: 100%;
    background: var(--bg-element2);
    cursor: pointer;
  }
`;
