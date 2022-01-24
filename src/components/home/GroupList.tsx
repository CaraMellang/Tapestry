import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

export default function GroupList() {
  const userSelector = useSelector((state: any) => state.userSliceReducer);
  console.log(userSelector);
  return (
    <GroupListWrap>
      <div>그룹목록</div>
      <div>
        {userSelector.user.group.map((item: any, index: number) => {
          return (
            <div key={index}>
              <div>[그룹이름] {item.group_name}</div>
              <div>[그룹인원] {item.group_people_count} 명</div>
              <div>[주인장] {item.owner_id.user_name}</div>
              <div>[그룹설명] {item.group_description}</div>
            </div>
          );
        })}
      </div>
    </GroupListWrap>
  );
}

const GroupListWrap = styled.div``;
