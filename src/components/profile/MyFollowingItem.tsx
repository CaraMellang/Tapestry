import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import client from "../../lib/api/client";
import { User } from "../../modules/redux/User";

interface MyFollowingItemProps {
  item: User;
  getFollowing: ()=>void
}

export default function MyFollowingItem({ item,getFollowing }: MyFollowingItemProps) {
  const userId = useSelector((state: any) => state.userSliceReducer.user._id);

  const unFollowing = async () => {
    const isUnfollowing = window.confirm("정말로 언팔로윙 하시겠습니까?");
    if (!isUnfollowing) return;

    try {
      const patchFollowing = await client.patch(`/follow/unfollowing`, {
        user_id: userId,
        following_user_id: item._id,
      });
      console.log(patchFollowing);
      getFollowing()
    } catch (err) {
      console.dir(err);
    }
  };

  return (
    <MyFollowingItemWrap>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img width={40} height={40} src={item.user_img} />
        <div style={{ marginLeft: "0.5rem" }}>{item.user_name}</div>
      </div>
      <div>
        <button className="following" onClick={unFollowing}>
          팔로잉
        </button>
      </div>
    </MyFollowingItemWrap>
  );
}

const MyFollowingItemWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  background: var(--bg-element2);
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.2);

  img {
    border-radius: 20px;
  }
  .following {
    color: white;
    background: #ff5757;
    border-radius: 4px;
    cursor: pointer;
  }
`;
