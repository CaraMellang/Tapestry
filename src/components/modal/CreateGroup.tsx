import React, { useState } from "react";
import styled from "styled-components";

interface CreateGroupProps {
  isOpenModal: boolean;
  onOpenModalClick(bool: boolean): void;
}

export default function CreateGroup({
  isOpenModal,
  onOpenModalClick,
}: CreateGroupProps) {
  const [description, setDescription] = useState("");
  const stopBubble = (e: any) => {
    e.stopPropagation();
  };

  const onDescriptionChange = (e: any) => {
    console.log(e);
    setDescription(e.target.value);
    console.log(description);
  };

  const onCreateClick = () => {
    console.log("클릭", description);
  };

  return (
    <CreateGroupWrap>
      <div
        className={`${isOpenModal ? "modal modal-index" : ""}`}
        onClick={() => onOpenModalClick(false)}
      >
        {isOpenModal && (
          <div className="modal-box " onClick={stopBubble}>
            <div className="modalHeader" style={{ padding: "20px 0" }}>
              그룹 생성하기
            </div>
            <div className="modalMain" style={{ padding: "40px 10px" }}>
              <p>여기엔 사진</p>
              <textarea onChange={onDescriptionChange} value={description} />
            </div>
            <div className="modalFooter" style={{ padding: "10px 10px" }}>
              <button onClick={() => onOpenModalClick(false)}>취소</button>
              <button onClick={onCreateClick}>생성</button>
            </div>
          </div>
        )}
      </div>
      <div className={`${isOpenModal ? "modalback back-index" : ""}`}></div>
    </CreateGroupWrap>
  );
}

const CreateGroupWrap = styled.div`
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: all 0.2s ease-in-out;
  }
  .modal-box {
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 600px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 12px;
    background-color: white;
  }
  .modalHeader {
    font-weight: bold;
    text-align: center;
  }
  .modalMain {
  }
  textarea {
    width: 100%;
    height: 6.25em;
    /* border: none; */
    resize: none;
    transition: all 0.2s ease-in-out;
  }
  textarea:focus {
    outline: none;
    border: 1px solid pink;
  }
  .modalFooter {
    border-radius: 0 0 12px 12px;
    text-align: right;
    background-color: #ececec;
  }
  .modalback {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
    transition: all 0.2s ease-in-out;
  }

  .modal-index {
    z-index: 222;
  }
  .back-index {
    z-index: 22;
  }
`;
