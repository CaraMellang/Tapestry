import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useInput from "../../hook/useInput";
import { getCookie } from "../../lib/cookie";
import handlingDataForm from "../../lib/handlingDataForm";
import httpPath from "../../lib/mode";

interface CreateGroupProps {
  isOpenModal: boolean;
  onOpenModalClick(bool: boolean): void;
}

export default function CreateGroup({
  isOpenModal,
  onOpenModalClick,
}: CreateGroupProps) {
  const [uploadImg, setUploadImg] = useState<Blob | null>(null);
  const [fileImage, setFileImage] = useState<string | undefined>(undefined);
  const [titleValue, onTitleValueChange, setTitleValue] = useInput(null);
  const [descriptionValue, onDescriptionChange, setDescriptionValue] =
    useInput(null);
  const formData = new FormData();

  const stopBubble = (e: any) => {
    e.stopPropagation();
  };

  const onCreateClick = async () => {
    console.log("클릭", descriptionValue, fileImage);
    if (!titleValue || !descriptionValue)
      return window.alert("그룹명 , 설명을 적어주세요.");
    if (uploadImg) {
      formData.append("group_img", uploadImg);
    }
    formData.append("group_name", titleValue);
    formData.append("group_description", descriptionValue);

    // if (uploadImg) {
    //   const fileReader = new FileReader();
    //   fileReader.readAsDataURL(uploadImg);
    //   fileReader.onloadend = () => {
    //     const base64Data = fileReader.result;
    //     console.log(base64Data);
    //     if (!base64Data) return;
    //     // formData.append("image", base64Data);
    //     handlingDataForm(formData,base64Data)
    //   };
    // }

    // for (var pair of formData.values()) {
    //   console.log("bb", pair);
    // }
    //tsconfig
    // {
    //   "compilerOptions": {
    //     "target" : "es5",
    //     "downlevelIteration": true,
    //   },
    // }

    const cookiee = getCookie("access_token");

    try {
      await axios.post(`${httpPath}/group/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${cookiee}`,
        },
      });
      window.alert("완료");
    } catch (err) {
      console.log(err);
    }
  };

  const onUploadFile = (e: any) => {
    const {
      target: { files },
    } = e;
    console.log(typeof files[0]);
    setUploadImg(files[0]);
    setFileImage(URL.createObjectURL(files[0]));
    console.log(URL.createObjectURL(files[0]), fileImage);
  };

  useEffect(() => {
    if (!isOpenModal) {
      setTitleValue("");
      setDescriptionValue("");
      if (fileImage) {
        URL.revokeObjectURL(fileImage);
        setFileImage(undefined);
      }
      if (uploadImg) {
        setUploadImg(null);
      }
    }
  }, [isOpenModal]);

  return (
    <CreateGroupWrap>
      <div
        className={`${isOpenModal ? "modal modal-index" : ""}`}
        onClick={() => onOpenModalClick(false)}
      >
        {isOpenModal && (
          <div className="modal-box " onClick={stopBubble}>
            {/* <div className="modalHeader" style={{ padding: "20px 0" }}>
              그룹 생성하기
            </div> */}
            <div className="modalMain" style={{ padding: "40px 10px" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <img className="previewImg" alt="sample" src={fileImage}></img>
                <label className="uploadBtn" htmlFor="uploadButton">
                  <div>사진 업로드</div>
                  <div>30MB 이하 가능</div>
                </label>
                <input
                  id="uploadButton"
                  type="file"
                  accept=".jpg,.png"
                  onChange={onUploadFile}
                  style={{ display: "none" }}
                />
              </div>
              <input
                className="groupTitle"
                type="text"
                placeholder="그룹 이름을 정해주세요"
                value={titleValue}
                onChange={onTitleValueChange}
              />
              <textarea
                onChange={onDescriptionChange}
                value={descriptionValue}
                placeholder="그룹을 소개해보세요!"
              />
            </div>
            <div className="modalFooter" style={{ padding: "10px 10px" }}>
              <button
                className="cancelBtn"
                style={{ marginRight: "12px" }}
                onClick={() => onOpenModalClick(false)}
              >
                취소
              </button>
              <button className="createBtn" onClick={onCreateClick}>
                그룹 만들기
              </button>
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
    height: 350px;
    border-radius: 12px;
  }
  .uploadBtn {
    display: flex;
    flex-direction: column;
    margin: 10px auto;
    padding: 12px;
    border-radius: 12px;
    color: white;
    text-align: center;
    cursor: pointer;
    background-color: #00c471;
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
  input[type="text"] {
    width: 100%;
    border: 1px solid black;
    margin-bottom: 16px;
    padding: 4px;
    transition: all 0.2s ease-in-out;
  }
  input[type="text"]:focus {
    outline: none;
    border: 1px solid pink;
  }
  textarea {
    width: 100%;
    height: 6.25em;
    /* border: none; */
    padding: 4px;
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
  button {
    border: none;
    padding: 8px;
    border-radius: 12px;
  }
  .cancelBtn {
    background-color: white;
  }
  .createBtn {
    color: white;
    background-color: #00c471;
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
