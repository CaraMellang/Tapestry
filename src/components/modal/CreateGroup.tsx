import React, { useEffect, useState } from "react";
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
  const [uploadImg, setUploadImg] = useState<File | null>(null);
  const [fileImage, setFileImage] = useState("");
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

  const onUploadFile = (e: any) => {
    const {
      target: { files },
    } = e;
    // console.log(files[0]);
    setUploadImg(files[0]);
    setFileImage(URL.createObjectURL(files[0]));
  };

  // const priview = () => {
  //   if (!uploadImg) return;

  //   console.log(uploadImg);
  //   const imgElement = document.querySelector<HTMLElement>(".previewImg");
  //   const reader = new FileReader();

  //   if (!imgElement) return;

  //   reader.onload = () =>
  //     (imgElement.style.backgroundImage = `url(${reader.result})`);
  //   reader.readAsDataURL(uploadImg);
  // };

  // useEffect(() => {
  //   priview();
  //   return () => priview();
  // }, [uploadImg]);

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
              {/* <div
                className="previewImg"
                style={{
                  width: "100%",
                  height: "200px",
                  backgroundRepeat: "no-repeat",
                }}
              ></div> */}
              <div>
                <img className="previewImg" alt="sample" src={fileImage}></img>
              </div>
              <input type="file" accept="image/*" onChange={onUploadFile} />
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
  .previewImg {
    width: 100%;
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
