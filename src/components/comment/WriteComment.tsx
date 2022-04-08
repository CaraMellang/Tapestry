import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import useInput from "../../hook/useInput";
import client from "../../lib/api/client";

interface WriteCommetProps {
  postId: string;
  isChild?: boolean;
  parantId?: string;
  parantOwnerName?: string;
  onReloading?: () => void;
}

export default function WriteComment({
  postId,
  isChild,
  parantId,
  parantOwnerName,
  onReloading,
}: WriteCommetProps) {
  const [text, onChangeText, setText] = useInput("");
  const [loading, setLoading] = useState(false);
  const userImg = useSelector(
    (state: any) => state.userSliceReducer.user.user_img
  );
  const userId = useSelector(
    (state: any) => state.userSliceReducer.user.userId
  );

  const onClickCommentPost = async () => {
    if (loading) return;
    if (text === "") return window.alert("값을 채워");

    if (isChild) {
      try {
        setLoading(true);
        await client.post(`/comment/child/create`, {
          post_id: postId,
          parant_comment_id: parantId,
          text,
        });
        setText("");
        setLoading(false);
        if (onReloading) {
          onReloading();
        }
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
      return window.alert("자식 포스팅 완료");
    }

    console.log("여기 넘어가는지 테스트");

    try {
      setLoading(true);
      await client.post(`/comment/parant/create`, {
        post_id: postId,
        user_id: userId,
        text,
      });
      setText("");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <WriteCommentWrap>
      <div className="flexBox">
        <div className="userImgBox">
          <img
            width={30}
            height={30}
            className="userImg"
            style={{ borderRadius: "40px" }}
            src={userImg}
          />
        </div>
        <div className="writeArea">
          <input
            type="text"
            className={`${loading && "disableElement"}`}
            placeholder={
              parantOwnerName
                ? `${parantOwnerName}님에게 표현하세요!`
                : "댓글을 남겨주세요"
            }
            onChange={onChangeText}
            value={text}
            disabled={loading}
          />
        </div>
        <div style={{ width: "8%" }}>
          <button
            className={`theme-bg-element1 postButton ${
              loading && "disableElement"
            }`}
            disabled={loading}
            onClick={onClickCommentPost}
          >
            보내기
          </button>
        </div>
      </div>
    </WriteCommentWrap>
  );
}

const WriteCommentWrap = styled.div`
  border: 1px solid gray;
  border-radius: 20px;
  padding: 4px;
  .flexBox {
    display: flex;
  }
  .userImgBox {
    width: 4%;
    position: relative;
  }
  .userImg {
  }
  .writeArea {
    width: 88%;
  }
  input[type="text"] {
    width: 100%;
    color: black;
    height: 100%;
    border: 0;
    border-radius: 8px;
    padding: 0 8px;
  }
  button {
    width: 100%;
    height: 30px;
    border-radius: 8px;
  }

  .disableElement {
    cursor: not-allowed;
  }
`;
