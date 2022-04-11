import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import useInput from "../../hook/useInput";
import client from "../../lib/api/client";
import { getCookie } from "../../lib/cookie";
import handlingDataForm from "../../lib/handlingDataForm";
import httpPath from "../../lib/mode";
import { READ_GROUPS_REQUEST } from "../../modules/redux/Groups";

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
  const dispatch = useDispatch();
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
      await client.post(`/group/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      window.alert("완료");
      onOpenModalClick(false);
      const data = { page: 1 };
      dispatch(READ_GROUPS_REQUEST(data));
    } catch (err) {
      console.log(err);
    }
  };

  const onUploadFile = (e: any) => {
    const {
      target: { files },
    } = e;
    setUploadImg(files[0]);
    setFileImage(URL.createObjectURL(files[0]));
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
          <div className="modal-box theme-bg-element1" onClick={stopBubble}>
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
                className="groupTitle theme-bg-element2"
                type="text"
                placeholder="그룹 이름을 정해주세요"
                value={titleValue}
                onChange={onTitleValueChange}
              />
              <textarea
                className="theme-bg-element2"
                onChange={onDescriptionChange}
                value={descriptionValue}
                placeholder="그룹을 소개해보세요!"
              />
            </div>
            <div
              className="modalFooter theme-bg-element2"
              style={{ padding: "10px 10px" }}
            >
              <button
                className="cancelBtn"
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
  }
  .modalHeader {
    font-weight: bold;
    text-align: center;
  }
  .modalMain {
  }
  input[type="text"] {
    width: 100%;
    border: 0;
    margin-bottom: 16px;
    padding: 4px;
  }
  input[type="text"]:focus {
    outline: none;
  }
  textarea {
    width: 100%;
    height: 6.25em;
    border: 0;
    /* border: none; */
    padding: 4px;
    resize: none;
  }
  textarea:focus {
    outline: none;
  }
  .modalFooter {
    border-radius: 0 0 12px 12px;
    text-align: right;
    /* background-color: #ececec; */
  }
  button {
    border: none;
    padding: 8px;
    border-radius: 12px;
  }
  .cancelBtn {
    color: white;
    background: #c21842;
    margin-right: 12px;
  }
  .createBtn {
    color: white;
    background: #00c471;
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
