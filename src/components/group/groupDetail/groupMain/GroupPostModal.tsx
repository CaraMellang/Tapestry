import React from "react";
import styled from "styled-components";
import useInput from "../../../../hook/useInput";

interface GroupPostModalProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function GroupPostModal({ setOpenModal }: GroupPostModalProps) {
  const [text, onTextChange] = useInput("");
  const stopBubble = (e: any) => {
    e.stopPropagation();
  };
  return (
    <GroupPostModalWrap
      onClick={() => {
        setOpenModal(false);
        document.body.style.overflow = "visible";
      }}
    >
      <div className="modal" onClick={stopBubble}>
        <div className="modal-box">
          <div>글쓰기</div>
          <div className="post-area-box">
            <textarea onChange={onTextChange}></textarea>
          </div>
        </div>
      </div>
      <div className="modal-back" />
    </GroupPostModalWrap>
  );
}

const GroupPostModalWrap = styled.div`
  .modal {
    position: fixed;

    width: 600px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0);
    z-index: 777;
  }
  .modal-box {
    display: flex;
    flex-direction: column;
  }
  .modal-back {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.2);
    z-index: 77;
  }
`;
