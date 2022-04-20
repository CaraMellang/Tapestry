import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import client from "../../../../lib/api/client";
import { Group } from "../../../../modules/redux/Groups";
import { User } from "../../../../modules/redux/User";
import GroupMemberItem from "./GroupMemberItem";

export default function GroupMember() {
  const [group, setGroup] = useState<Group>();
  const [userFollows, setUserFollow] = useState<string[]>();
  const { _id } = useParams();
  const userId = useSelector(
    (state: any) => state.userSliceReducer.user.userId
  );
  const getGroup = async () => {
    try {
      const {
        data: {
          data: { group, follows },
        },
      } = await client.get(`/group/readgroupmember`, {
        params: { group_id: _id, user_id: userId },
      });
      setGroup(group);
      setUserFollow(follows);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getGroup();
  }, []);
  return (
    <GroupMemberWrap>
      <div className="theme-bg-element2" style={{ textAlign: "center" }}>
        그룹 멤버
      </div>
      <div className="theme-bg-element2">
        {group &&
          userFollows &&
          group.group_peoples.map((item) => {
            return (
              <GroupMemberItem
                key={item._id}
                group_owner_id={group.owner_id._id}
                item={item}
                userFollows={userFollows}
                userId={userId}
              />
            );
          })}
      </div>
    </GroupMemberWrap>
  );
}

const GroupMemberWrap = styled.div``;
