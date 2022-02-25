import React, { useState } from "react";
import styled from "styled-components";
import CreateGroup from "../modal/CreateGroup";
import { Modal, Button } from "antd";

export default function GroupListHeader() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const onOpenModalClick = (bool: boolean) => {
    setIsOpenModal(bool);
  };

  return (
    <GroupListHeaderWrap>
      <div>그룹목록헤더</div>
      <div onClick={() => onOpenModalClick(true)} style={{ cursor: "pointer" }}>
        그룹 만들기
      </div>
      <CreateGroup
        isOpenModal={isOpenModal}
        onOpenModalClick={onOpenModalClick}
      />
    </GroupListHeaderWrap>
  );
}

const GroupListHeaderWrap = styled.div`
  display: flex;
`;
