import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getCookie } from "../../../../lib/cookie";
import httpPath from "../../../../lib/mode";
import { GROUP_EMPTY } from "../../../../modules/redux/Group";

interface GroupPostItemprops {
  item: any;
}

export default function GroupPostItem({ item }: GroupPostItemprops) {
  const userId = useSelector(
    (state: any) => state.userSliceReducer.user.userId
  );
  const dispatch = useDispatch();
  const onDeleteClick = async () => {
    let isDelete = window.confirm("정말로 삭제하시겠습니까?");
    if (!isDelete) return;
    try {
      const cookie = getCookie("access_token");
      await axios.delete(`${httpPath}/post/delete`, {
        data: { post_id: item._id },
        headers: { Authorization: `Bearer ${cookie}` },
      });
      dispatch(GROUP_EMPTY("dummy"));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <GroupPostItemWrap>
      <div
        style={{
          border: "1px solid white",
          padding: "10px",
          boxSizing: "border-box",
        }}
      >
        <div>{item.group_id.group_name}</div>
        <div>
          {item.text.split("\n").map((item: string, index: number) => {
            //나중에 섹쉬하게 코드를 정돈해보자
            return (
              <span key={index}>
                {item} <br />
              </span>
            );
          })}
        </div>
        <div>{item.owner_id !== null ? item.owner_id.user_name : "null"}</div>
        <div>{item.created_at}</div>
        <div>
          {item.images.map((imgUrl: string, index: number) => (
            <img key={index} className="post-img" alt="??" src={imgUrl} />
          ))}
        </div>
      </div>
      <div>
        {item.comment.map((commentItem: any) => {
          return (
            <div key={commentItem._id} className="theme-bg-element1">
              {commentItem.text}
            </div>
          );
        })}
      </div>
      <div>
        {userId === item.owner_id._id ? (
          <button
            className="theme-bg-element1"
            style={{ border: 0 }}
            onClick={onDeleteClick}
          >
            삭제
          </button>
        ) : (
          "삭제권한 없음"
        )}
      </div>
    </GroupPostItemWrap>
  );
}

const GroupPostItemWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 10px;
`;
