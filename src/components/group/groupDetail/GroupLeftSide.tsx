import { Button } from "antd";
import React, { useEffect } from "react";
import styled from "styled-components";
import { groupDetailInterface } from "../../../pages/GroupDetail";
import { MinusCircleOutlined } from "@ant-design/icons";

interface GroupLeftSideProp {
  groupDetail: groupDetailInterface;
  isJoinGroup: boolean;
}

export default function GroupLeftSide({
  groupDetail,
  isJoinGroup,
}: GroupLeftSideProp) {
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
              <div style={{ color: "red" }}>
                <MinusCircleOutlined />
                그룹탈퇴
              </div>
            ) : (
              <Button type="default">그룹 가입하기</Button>
            )}
          </div>
        </div>
      </div>
    </GroupLeftSideWrap>
  );
}

const GroupLeftSideWrap = styled.aside`
  width: 250px;
  box-sizing: border-box;
  .info_layout {
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
  Button {
    width: 100%;
    border: none;
    border-radius: 12px;
    background-color: #00c471;
    color: white;
  }
  Button:hover {
    background-color: #00c471;
    color: white;
    border: none;
  }
`;
