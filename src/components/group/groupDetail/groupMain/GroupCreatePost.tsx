import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import useAllowGroupService from "../../../../lib/useAllowGroupService";
import AllowGroupService from "../../../../lib/useAllowGroupService";
import GroupPostModal from "./GroupPostModal";

export default function GroupCreatePost() {
  const [openModal, setOpenModal] = useState(false);
  const [allow, onCheckUser, setAllow] = useAllowGroupService();
  const { _id } = useParams();

  useEffect(() => {
    if (_id) onCheckUser(_id);
  }, []);

  return (
    <GroupCreatePostWrap>
      <div
        className="posting-box"
        style={{}}
        onClick={() => {
          if (!allow) return window.alert("그룹 가입 후 이용가능합니다!");
          setOpenModal(true);
          document.body.style.overflow = "hidden";
        }}
      >
        포스팅하기
      </div>
      {openModal && <GroupPostModal setOpenModal={setOpenModal} />}
    </GroupCreatePostWrap>
  );
}

const GroupCreatePostWrap = styled.div`
  .posting-box {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: bold;
    height: 100px;
    background: #7a7979;
    border-radius: 0.5rem;
    cursor: pointer;
  }
`;
