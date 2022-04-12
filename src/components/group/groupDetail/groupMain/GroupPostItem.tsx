import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import client from "../../../../lib/api/client";
import { getCookie } from "../../../../lib/cookie";
import httpPath from "../../../../lib/mode";
import useAllowGroupService from "../../../../lib/useAllowGroupService";
import { GROUP_EMPTY, GROUP_REQUEST } from "../../../../modules/redux/Group";
import { ParantComment } from "../../../comment/CommentItemList";
import CommentLayout from "../../../comment/CommentLayout";

interface GroupPostItemprops {
  item: any;
  group_id: string | null | undefined;
}

export default function GroupPostItem({ item, group_id }: GroupPostItemprops) {
  const [showComment, setShowComment] = useState(false);
  const [commentArr, setCommentArr] = useState<ParantComment[]>();
  const [parantReload, setParantReload] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [allow, onCheckUser] = useAllowGroupService();
  const userId = useSelector(
    (state: any) => state.userSliceReducer.user.userId
  );
  const groupSelector = useSelector((state: any) => state.groupSliceReducer);
  const dispatch = useDispatch();
  const onDeleteClick = async () => {
    let isDelete = window.confirm("정말로 삭제하시겠습니까?");
    if (!isDelete) return;
    try {
      const cookie = getCookie("access_token");
      await client.delete(`/post/delete`, { data: { post_id: item._id } });
      // await axios.delete(`${httpPath}/post/delete`, {
      //   data: { post_id: item._id },
      //   headers: { Authorization: `Bearer ${cookie}` },
      // });
      dispatch(GROUP_EMPTY("dummy"));
    } catch (err) {
      console.log(err);
    }
  };

  const onClickShowComment = async () => {
    try {
      const {
        data: { data },
      } = await client.post(`/comment/parant/read`, { post_id: item._id });
      setCommentArr(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const onClickLike = async () => {
    if (!allow) return window.alert("그룹 가입 후 이용가능합니다.");
    try {
      await client.patch(`/post/like/like`, { post_id: item._id });
      console.log("실행여부");
      setIsLike(true);
    } catch (err) {
      console.log(err);
    }
  };
  const onClickDislike = async () => {
    if (!allow) return window.alert("그룹 가입 후 이용가능합니다.");
    try {
      await client.patch(`/post/like/dislike`, { post_id: item._id });
      console.log("실행여부");
      setIsLike(false);
    } catch (err) {
      console.log(err);
    }
  };

  const onParantReloading = () => {
    setParantReload((prev) => !prev);
  };

  useEffect(() => {
    if (showComment) {
      onClickShowComment();
    }
  }, [parantReload, showComment]);

  useEffect(() => {
    if (item.like_user.length > 0) {
      item.like_user.forEach((likeUserId: any) => {
        console.log("유저아이디 비교할거임", likeUserId, userId);
        if (likeUserId === userId) {
          setIsLike(true);
        }
      });
    }
  }, [isLike, item.like_user, userId]);

  useEffect(() => {
    if (group_id) onCheckUser(group_id);
  }, []);

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
        <div>
          {isLike ? (
            <div onClick={onClickDislike}>♥좋아요</div>
          ) : (
            <div onClick={onClickLike}>♡좋아요 누르기</div>
          )}
        </div>
        <div>좋아요 수{item.like_count}</div>
        <button
          className="theme-bg-element1"
          onClick={() => {
            setShowComment((prev) => !prev);
          }}
        >
          댓글 나와주세요(댓글 수 {item.comment.length})
        </button>
      </div>
      <div>
        {showComment && (
          <CommentLayout
            commentArr={commentArr}
            ownerId={item.owner_id._id}
            postId={item._id}
            onParantReloading={onParantReloading}
          />
        )}
        {/* {item.comment.map((commentItem: any) => {
          console.log(commentItem)
          return (
            <div key={commentItem._id} className="theme-bg-element1">
              {commentItem.text}
            </div>
          );
        })} */}
      </div>
      <div>
        {userId === item.owner_id._id ? (
          <button className="theme-bg-element1" onClick={onDeleteClick}>
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
