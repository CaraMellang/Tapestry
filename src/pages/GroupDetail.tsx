import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import GroupLeftSide from "../components/group/groupDetail/GroupLeftSide";
import GroupMain from "../components/group/groupDetail/GroupMain";
import { useDispatch, useSelector } from "react-redux";
import httpPath from "../lib/mode";

export interface groupDetailInterface {
  _id: string;
  group_description: string;
  group_img: string;
  group_name: string;
  group_people_count: number;
  group_peoples: [{}];
  owner_id: {
    _id: string;
    email: string;
    user_name: string;
    user_img: string | null;
  };
  created_at: Date;
  updated_at: Date | null;
}

export default function GroupDetail() {
  const userSelector = useSelector((state: any) => state.userSliceReducer);
  const [groupDetail, setGroupDetail] = useState<groupDetailInterface>({
    _id: "string;",
    group_description: "string;",
    group_img: "string;",
    group_name: "string;",
    group_people_count: 0,
    group_peoples: [{}],
    owner_id: {
      _id: "string;",
      email: "string;",
      user_name: "string;",
      user_img: null,
    },
    created_at: new Date(),
    updated_at: null,
  });
  const [isJoinGroup,setIsJoinGroup] = useState(false);
  const { _id } = useParams();
  let groupLoading = true;
  let groupPostLoading = true;

  console.log(_id);

  const readGroupDetail = async () => {
    try {
      const {
        data: { Group },
      } = await axios.post(`${httpPath}/group/groupdetail`, {
        group_id: _id,
        user_id: userSelector.user.userId,
      });
      if (
        userSelector.user.group.find(
          (element: any) => element._id === Group._id
        )
      ) {
        setIsJoinGroup(true)
      } else {
        setIsJoinGroup(false)
      }
      setGroupDetail(Group);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    readGroupDetail();
  }, []);

  return (
    <GroupDetailWrap>
      <h1>그룹 디테일 페이지</h1>
      <div>해당 그룹의 아이디 {{ _id }._id}</div>
      <div className="layout_view">
        <div className="main_layout">
          <GroupLeftSide groupDetail={groupDetail} isJoinGroup={isJoinGroup} />
          <GroupMain />
        </div>
      </div>
    </GroupDetailWrap>
  );
}

const GroupDetailWrap = styled.div`
  .layout_view {
    width: 100%;
    background-color: #f5f5f5;
  }
  .main_layout {
    width: 1200px;
    display: flex;
    margin: auto;
  }
`;
