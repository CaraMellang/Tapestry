import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import client from "../../../../lib/api/client";
import { getCookie } from "../../../../lib/cookie";
import httpPath from "../../../../hook/useDesktop";
import useAllowGroupService from "../../../../lib/useAllowGroupService";
import {
  GROUP_EMPTY,
  GROUP_REQUEST,
  Post,
} from "../../../../modules/redux/Group";
import { ParantComment } from "../../../comment/CommentItemList";
import CommentLayout from "../../../comment/CommentLayout";
import PostBody from "./PostBody";
import PostBottom from "./PostBottom";

interface GroupPostItemprops {
  postItem: Post;
  group_id: string | null | undefined;
}

export default function GroupPostItem({
  postItem,
  group_id,
}: GroupPostItemprops) {
  const [item, setItem] = useState<Post>(postItem);
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
      dispatch(GROUP_EMPTY("dummy"));
    } catch (err) {
      console.log(err);
    }
  };

  const onClickLike = async () => {
    if (!allow) return window.alert("그룹 가입 후 이용가능합니다.");
    try {
      await client.patch(`/post/like/like`, { post_id: item._id });
      const {
        data: { data },
      } = await client.get(`/post/getpost`, {
        params: { group_id, post_id: item._id },
      });
      setItem(data);
    } catch (err) {
      console.log(err);
    }
  };
  const onClickDislike = async () => {
    if (!allow) return window.alert("그룹 가입 후 이용가능합니다.");
    try {
      await client.patch(`/post/like/dislike`, { post_id: item._id });
      const {
        data: { data },
      } = await client.get(`/post/getpost`, {
        params: { group_id, post_id: item._id },
      });
      setItem(data);
    } catch (err) {
      console.log(err);
    }
  };

  useLayoutEffect(() => {
    if (item.like_user.length > 0) {
      item.like_user.forEach((likeUserId: any) => {
        console.log("유저아이디 비교할거임", likeUserId, userId);
        if (likeUserId === userId) {
          setIsLike(true);
        } else {
          setIsLike(false);
        }
      });
    } else if (item.like_user.length === 0) {
      //배열이 비었으면 forEach 작동안함.
      setIsLike(false);
    }
  }, [item.like_user, userId]);

  useEffect(() => {
    if (group_id) onCheckUser(group_id);
  }, []);

  return (
    <GroupPostItemWrap>
      <PostBody item={item} />
      <PostBottom
        item={item}
        isLike={isLike}
        onClickLike={onClickLike}
        onClickDislike={onClickDislike}
        showComment={showComment}
        setShowComment={setShowComment}
      />
      {/* <div>
        {userId === item.owner_id._id ? (
          <button className="theme-bg-element1" onClick={onDeleteClick}>
            삭제
          </button>
        ) : (
          "삭제권한 없음"
        )}
      </div> */}
    </GroupPostItemWrap>
  );
}

const GroupPostItemWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 10px;
  background: var(--bg-element2);
  padding: 0.5rem;
  border-radius: 0.5rem;
`;
