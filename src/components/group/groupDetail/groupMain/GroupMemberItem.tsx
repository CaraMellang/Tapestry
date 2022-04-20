import React, { useLayoutEffect, useState } from "react";
import styled from "styled-components";
import client from "../../../../lib/api/client";
import { User } from "../../../../modules/redux/User";

interface GroupMemberItemProps {
  group_owner_id: string;
  item: User;
  userFollows: string[] | undefined;
  userId: string;
}

export default function GroupMemberItem({
  group_owner_id,
  item,
  userFollows: follows,
  userId,
}: GroupMemberItemProps) {
  const [userItem, setUserItem] = useState<User>(item);
  // const [follows, setFollows] = useState<string[] | undefined>(follows);
  const [isFollow, setIsFollow] = useState(false);

  const onClickFollow = async () => {
    try {
      const request = await client.patch(`/follow/following`, {
        user_id: userId,
        following_user_id: userItem._id,
      });
      if (request.status === 200) {
        setIsFollow(true);
      }
    } catch (err: any) {
      // console.log("Error Message:", err.response.data.message);
      console.log(err)
    }
  };

  const onClickUnFollow = async () => {
    try {
      const request = await client.patch(`/follow/unfollowing`, {
        user_id: userId,
        following_user_id: userItem._id,
      });
      if (request.status === 200) {
        setIsFollow(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useLayoutEffect(() => {
    if (follows) {
      follows.forEach((Id) => {
        if (Id === userItem._id) {
          setIsFollow(true);
        }
      });
    }
  }, []);
  return (
    <GroupMemberItemWrap>
      <img
        src={userItem.user_img}
        width={40}
        height={40}
        style={{ borderRadius: "24px" }}
      />
      <span>&nbsp; {userItem.user_name}</span>
      <span>
        &nbsp; {userItem._id === group_owner_id ? "⭐그룹 주인⭐" : ""}
      </span>
      <span>
        &nbsp;{" "}
        {userItem._id === userId ? (
          "❤️본인❤️"
        ) : isFollow ? (
          <button className="followBtn following" onClick={onClickUnFollow}>
            팔로윙
          </button>
        ) : (
          <button className="followBtn follow" onClick={onClickFollow}>
            팔로우
          </button>
        )}
      </span>
    </GroupMemberItemWrap>
  );
}

const GroupMemberItemWrap = styled.div`
  .followBtn {
    border-radius: 8px;
    cursor: pointer;
  }
  .following {
    background: rgb(194, 24, 66);
  }
  .follow {
    background: rgb(0, 196, 113);
  }
`;
