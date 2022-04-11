import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import GroupLeftSide from "../components/group/groupDetail/groupLeft/GroupLeftSide";
import GroupMain from "../components/group/groupDetail/groupMain/GroupMain";
import { useDispatch, useSelector } from "react-redux";
import httpPath from "../lib/mode";
import { getCookie } from "../lib/cookie";
import Loading from "../components/Loading";
import client from "../lib/api/client";
import { TOKEN_REQUEST } from "../modules/redux/User";

export interface groupDetailInterface {
  _id: string | null;
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
  const dispatch = useDispatch()
  const [groupDetail, setGroupDetail] = useState<groupDetailInterface>({
    _id: null,
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
  const [isJoinGroup, setIsJoinGroup] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const { _id } = useParams();
  let groupLoading = true;
  let groupPostLoading = true;

  useEffect(() => {
    const readGroupDetail = async () => {
      // 네트워크를 3g로 하면 콘솔에는 false로만 나오지만 Loading 프로그레스 컴포넌트는 잘 나오는걸 확인가능.
      setDetailLoading(true);
      try {
        const {
          data: { Group },
        } = await client.post(`/group/groupdetail`, {
          group_id: _id,
          user_id: userSelector.user.userId,
        });

        setGroupDetail(Group);
        dispatch(TOKEN_REQUEST(''))
        setDetailLoading(false);
      } catch (err) {
        console.log(err);
        setDetailLoading(false);
      }
    };

    if (!detailLoading && groupDetail._id === null) {
      readGroupDetail();
    }
  }, [detailLoading, groupDetail._id, userSelector.user.userId, _id]);

  useEffect(() => {
    if (
      userSelector.user.group.find(
        (element: any) => element._id === groupDetail._id
      )
    ) {
      console.log("1");
      setIsJoinGroup(true);
    } else {
      console.log("12", userSelector.user.group, groupDetail);
      setIsJoinGroup(false);
    }
  }, [userSelector.user.group, groupDetail._id, _id]);

  return (
    <GroupDetailWrap>
      <h1>그룹 디테일 페이지</h1>
      <div>해당 그룹의 아이디 {{ _id }._id}</div>
      <div className="layout_view">
        {detailLoading ? (
          <Loading />
        ) : (
          <div className="main_layout">
            <GroupLeftSide
              groupDetail={groupDetail}
              isJoinGroup={isJoinGroup}
              setGroupDetail={setGroupDetail}
            />
            <GroupMain group_id={groupDetail._id} />
          </div>
        )}
      </div>
    </GroupDetailWrap>
  );
}

const GroupDetailWrap = styled.div`
  .layout_view {
    width: 100%;
    /* background-color: #f5f5f5; */
    min-height: 500px;
  }
  .main_layout {
    width: 1200px;
    height: 100%;
    display: flex;
    margin: auto;
  }
`;
