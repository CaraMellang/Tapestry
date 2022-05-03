import React, { useState } from "react";
import styled from "styled-components";
import media from "../../lib/media";
import CreateGroup from "../modal/CreateGroup";

export default function CreateGroupFloat() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const onOpenModalClick = (bool: boolean) => {
    setIsOpenModal(bool);
  };
  return (
    <CreateGroupFloadWrap>
      <div
        className="create-group-open-btn"
        onClick={() => onOpenModalClick(true)}
        style={{ cursor: "pointer", height: "100%" }}
      ></div>
      <CreateGroup
        isOpenModal={isOpenModal}
        onOpenModalClick={onOpenModalClick}
      />
    </CreateGroupFloadWrap>
  );
}

const CreateGroupFloadWrap = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 3rem;
  height: 3rem;
  background: var(--primary1);
  border-radius: 1.5rem;
  :hover {
    background: var(--primary2);
  }
  .create-group-open-btn {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .create-group-open-btn::before {
    background: white;
    content: "";
    height: 7.5px;
    position: absolute;
    width: 60%;
    border-radius: 4px;
  }
  .create-group-open-btn::after {
    background: white;
    content: "";
    height: 60%;
    position: absolute;
    width: 7.5px;
    border-radius: 4px;
  }
  ${media.medium} {
    bottom: 1rem;
    right: 1rem;
  }
`;
