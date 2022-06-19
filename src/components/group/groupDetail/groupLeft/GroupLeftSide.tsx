import { Button } from "antd";
import React, { useEffect } from "react";
import styled from "styled-components";
import { groupDetailInterface } from "../../../../pages/GroupDetail";
import { MinusCircleOutlined } from "@ant-design/icons";
import { getCookie } from "../../../../lib/cookie";
import axios from "axios";
import httpPath from "../../../../hook/useDesktop";
import { useDispatch, useSelector } from "react-redux";
import { TOKEN_REQUEST } from "../../../../modules/redux/User";
import client from "../../../../lib/api/client";
import GroupSettingBtn from "../../../common/GroupSettingBtn";
import { useNavigate } from "react-router-dom";

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
  const token = getCookie("access_token");
  const userId = useSelector(
    (state: any) => state.userSliceReducer.user.userId
  );
  const navigate = useNavigate();

  const onJoinGroupClick = async () => {
    const isJoin = window.confirm("그룹에 가입하시겠습니까?");
    if (!isJoin) {
      return;
    }
    try {
      const data = await client.post(`/group/joingroup`, {
        group_id: groupDetail._id,
      });
      dispatch(TOKEN_REQUEST(token)); //바뀐정보 갱신
      window.alert("가입완료");
      setGroupDetail({ ...groupDetail, _id: null });
    } catch (err) {
      console.log(err);
    }
  };
  const onLeaveGroupClick = async () => {
    const isLeave = window.confirm("정말로 그룹을 나가실건가요?");
    if (!isLeave) return;
    if (userId === groupDetail.owner_id._id)
      return window.alert("그룹 생성자는 탈퇴가 불가합니다."); //이후 양도하는 방식, 그룹 삭제 추가예정
    try {
      const data = await client.post(`/group/leavegroup`, {
        group_id: groupDetail._id,
      });
      dispatch(TOKEN_REQUEST(token));
      window.alert("완료");
      setGroupDetail({ ...groupDetail, _id: null });
    } catch (err) {
      console.log(err);
    }
    console.log(isLeave);
  };

  const onClickgNavigate = () => {
    navigate(`setting`);
  };

  return (
    <GroupLeftSideWrap>
      <div className="info_layout theme-bg-element2">
        <div className="info_layout_cover_img" style={{ overflow: "hidden" }}>
          <img
            style={{ width: "100%", height: "150px" }}
            src={groupDetail.group_img}
            alt={`그룹의 대표이미지`}
          />
        </div>
        <div className="info_layout_bot">
          <h2>{groupDetail.group_name}</h2>
          <p>
            {groupDetail.group_description.split("\n").map((text, index) => (
              <span>
                {text} <br />
              </span>
            ))}
          </p>
          <p>멤버 수 : {groupDetail.group_people_count}</p>
          <div className="group_btns">
            {isJoinGroup === true ? (
              <span
                style={{ color: "red", cursor: "pointer" }}
                onClick={onLeaveGroupClick}
              >
                <MinusCircleOutlined />
                &nbsp;그룹탈퇴
              </span>
            ) : (
              <button type="button" onClick={onJoinGroupClick}>
                <span>그룹 가입하기</span>
              </button>
            )}
            {groupDetail.owner_id._id === userId && (
              <GroupSettingBtn onClick={onClickgNavigate}>
                그룹세팅
              </GroupSettingBtn>
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
    width: 250px;
    position: fixed;
    box-sizing: border-box;
    border-radius: 0.5rem;
    overflow: hidden;
    /* transform: translateX(-16px); */
  }
  .info_layout_cover_img {
    background-color: gray;
    height: 150px;
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
    border-radius: 0.5rem;
    background-color: #00c471;
    color: white;
    cursor: pointer;
  }
  .group_btns {
    display: flex;
    justify-content: space-between;
  }
`;
