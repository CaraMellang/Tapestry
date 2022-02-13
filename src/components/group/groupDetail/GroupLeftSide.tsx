import { Button } from "antd";
import React, { useEffect } from "react";
import styled from "styled-components";
import { groupDetailInterface } from "../../../pages/GroupDetail";
import { MinusCircleOutlined } from "@ant-design/icons";
import { getCookie } from "../../../lib/cookie";
import axios from "axios";
import httpPath from "../../../lib/mode";
import { useDispatch } from "react-redux";
import { TOKEN_REQUEST } from "../../../modules/redux/User";

interface GroupLeftSideProp {
  groupDetail: groupDetailInterface;
  isJoinGroup: boolean;
  setGroupDetail: React.Dispatch<React.SetStateAction<groupDetailInterface>>;
}

export default function GroupLeftSide({
  groupDetail,
  isJoinGroup,
  setGroupDetail,
}: GroupLeftSideProp) {
  const dispatch = useDispatch();

  const onJoinGroupClick = async () => {
    const token = getCookie("access_token");
    const isJoin = window.confirm("그룹에 가입하시겠습니까?");
    if (!isJoin) {
      return;
    }
    try {
      const data = await axios.post(
        `${httpPath}/group/joingroup`,
        { group_id: groupDetail._id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(TOKEN_REQUEST(token));
      console.log(data);
      window.alert("가입완료");
      setGroupDetail({ ...groupDetail, _id: "undefined" });
    } catch (err) {
      console.log(err);
    }
  };
  const onLeaveGroupClick = async () => {
    const isLeave = window.confirm("정말로 그룹을 나가실건가요?");
    console.log(isLeave);
  };

  return (
    <GroupLeftSideWrap>
      <div className="info_layout">
        <div className="info_layout_cover_img">{groupDetail.group_img}</div>
        <div className="info_layout_bot">
          <h2>{groupDetail.group_name}</h2>
          <p>{groupDetail.group_description}</p>
          <p>멤버 수 : {groupDetail.group_people_count}</p>
          <div className="">
            {isJoinGroup === true ? (
              <span
                style={{ color: "red", cursor: "pointer" }}
                onClick={onLeaveGroupClick}
              >
                <MinusCircleOutlined />
                &nbsp;그룹탈퇴
              </span>
            ) : (
              // <Button type="default" >
              //   그룹 가입하기
              // </Button>
              <button type="button" onClick={onJoinGroupClick}>
                <span>그룹 가입하기</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </GroupLeftSideWrap>
  );
}

const GroupLeftSideWrap = styled.aside`
  width: 250px;
  position: relative;
  .info_layout {
    position: fixed;
    box-sizing: border-box;
    width: inherit;
    margin-right: 20px;
    background-color: white;
    border-radius: 12px;
    overflow: hidden;
  }
  .info_layout_cover_img {
    background-color: gray;
    height: 100px;
  }
  .info_layout_bot {
    box-sizing: border-box;
    padding: 12px;
  }
  h2 {
    font-weight: bold;
  }
  button {
    width: 100%;
    border: none;
    padding: 6px 15px;
    border-radius: 12px;
    background-color: #00c471;
    color: white;
    cursor: pointer;
  }
`;
