import React, { useState } from "react";
import styled from "styled-components";
import GroupPostModal from "./GroupPostModal";

export default function GroupCreatePost() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <GroupCreatePostWrap>
      <div
        style={{
          textAlign: "center",
          height: "100px",
          background: "#7a7979",
        }}
        onClick={() => {
          setOpenModal(true);
          document.body.style.overflow = "hidden"
        }}
      >
        글쓰기 영역입니다.
      </div>
      {openModal && <GroupPostModal setOpenModal={setOpenModal} />}
    </GroupCreatePostWrap>
  );
}

const GroupCreatePostWrap = styled.div``;
