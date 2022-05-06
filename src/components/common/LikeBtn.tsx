import React from "react";
import styled from "styled-components";

interface LikeBtnProps {
  isLike: boolean;
  onClickLike: () => void;
  onClickDislike: () => void;
}

export default function LikeBtn({
  isLike,
  onClickLike,
  onClickDislike,
}: LikeBtnProps) {
  return (
    <LikeBtnWrap >
      {isLike ? (
        <button onClick={onClickDislike}>좋아요♥</button>
      ) : (
        <button onClick={onClickLike}>좋아요♡</button>
      )}
    </LikeBtnWrap>
  );
}

const LikeBtnWrap = styled.div`
  button {
    width: 100%;
    background: var(--bg-element4);
  }
`;
