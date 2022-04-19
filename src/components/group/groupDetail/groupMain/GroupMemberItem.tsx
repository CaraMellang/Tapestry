import React, { useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { User } from "../../../../modules/redux/User";

interface GroupMemberItemProps {
  group_owner_id: string;
  item: User;
  follows: string[] | undefined;
}

export default function GroupMemberItem({
  group_owner_id,
  item,
  follows,
}: GroupMemberItemProps) {
  const [userItem, setUserItem] = useState<User>(item);
  const [isFollow, setIsFollow] = useState(false);
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
        {userItem._id === group_owner_id ? (
          "본인"
        ) : isFollow ? (
          <button className="followBtn following ">팔로윙</button>
        ) : (
          <button className="followBtn follow">팔로우</button>
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
