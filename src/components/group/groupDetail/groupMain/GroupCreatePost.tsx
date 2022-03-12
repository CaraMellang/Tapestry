import React, { useState } from "react";
import styled from "styled-components";
import GroupPostModal from "./GroupPostModal";

export default function GroupCreatePost() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <GroupCreatePostWrap>
      <div
        className="posting-box"
        style={{}}
        onClick={() => {
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
    cursor: pointer;
  }
`;
