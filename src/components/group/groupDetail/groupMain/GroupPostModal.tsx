import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import useInput from "../../../../hook/useInput";
import { getCookie } from "../../../../lib/cookie";
import httpPath from "../../../../lib/mode";
import { GROUP_REQUEST, GROUP_EMPTY } from "../../../../modules/redux/Group";

interface GroupPostModalProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function GroupPostModal({ setOpenModal }: GroupPostModalProps) {
  const [uploadImg, setUploadImg] = useState<[Blob] | [] | null>(null);
  const [fileImage, setFileImage] = useState<[string] | undefined>(undefined);
  const [text, onTextChange] = useInput("");
  const params = useParams();
  const userSliceReducer = useSelector((state: any) => state.userSliceReducer);
  const dispatch = useDispatch();
  const formData = new FormData();

  const stopBubble = (e: any) => {
    e.stopPropagation();
  };
  console.log();

  const onPostingClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const cookie = getCookie("access_token");
    if (!text) {
      return window.alert("글을 적어 주세요.");
    }
    if (uploadImg) {
      uploadImg.forEach((item: any) => {
        formData.append("post_imgs", item);
      });
    }
    formData.append("group_id", params._id ? params._id : "");
    formData.append("email", userSliceReducer.user.email);
    formData.append("is_private", "false");
    formData.append("text", text);
    try {
      await axios.post(`${httpPath}/post/create`, formData, {
        headers: { Authorization: `Bearer ${cookie}` },
      });
      window.alert("게시 완료");
      dispatch(GROUP_EMPTY("dummy"));
      setOpenModal(false);
      document.body.style.overflow = "visible";
    } catch (err) {
      console.log(err);
      window.alert("게시중 오류가 발생했습니다.");
    }
  };

  const onUploadFile = (e: any) => {
    const {
      target: { files },
    } = e;
    console.log(files);
    let imgBlob: any = [];
    let imgUrl: any = [];
    for (let i = 0; i < files.length; i++) {
      imgBlob[i] = files[i];
      imgUrl[i] = URL.createObjectURL(files[i]);
    }
    setUploadImg(imgBlob);
    setFileImage(imgUrl);
  };

  useEffect(() => {
    return () => {
      if (fileImage) {
        fileImage.forEach((item: string) => {
          URL.revokeObjectURL(item);
        });
      }
    };
  });

  return (
    <GroupPostModalWrap
      onClick={() => {
        setOpenModal(false);
        document.body.style.overflow = "visible";
      }}
    >
      <div className="modal theme-bg-element1" onClick={stopBubble}>
        <div className="modal-box">
          <div className="modal-header">
            <div className="modal-header-box">글쓰기</div>
          </div>
          <div className="modal-main">
            <div className="post-area-box">
              <textarea
                className="post-textarea theme-bg-element1"
                onChange={onTextChange}
                placeholder="새로운 거시기를 남겨보세요."
              ></textarea>
            </div>
            <div style={{ display: "flex" }}>
              {fileImage &&
                fileImage.map((item: any, index: number) => {
                  return (
                    <div key={index} className="preview-img-box">
                      <img className="preview-img" src={item}></img>
                    </div>
                  );
                })}
            </div>
            <div>
              <label className="uploadBtn" htmlFor="uploadButton">
                <div>사진 업로드</div>
                <div>30MB 이하 가능</div>
              </label>
              <input
                id="uploadButton"
                multiple
                type="file"
                accept=".jpg,.png,.gif"
                onChange={onUploadFile}
                style={{ display: "none" }}
              />
            </div>
          </div>
          <div className="modal-footer theme-bg-element2">
            <button
              className="cancel-btn"
              onClick={() => {
                setOpenModal(false);
                document.body.style.overflow = "visible";
              }}
            >
              취소
            </button>
            <button className="posting-btn" onClick={onPostingClick}>
              게시
            </button>
          </div>
        </div>
      </div>
      <div className="modal-back" />
    </GroupPostModalWrap>
  );
}

const GroupPostModalWrap = styled.div`
  button {
    color: white;
    border: none;
    padding: 8px;
    border-radius: 12px;
  }
  .modal {
    position: fixed;
    width: 600px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 12px;
    z-index: 777;
  }
  .modal-box {
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  .modal-header {
    font-weight: bold;
    font-size: 16px;
    padding: 0 24px;
  }
  .modal-header-box {
    padding-top: 12px;
    padding-bottom: 12px;
    border-bottom: 1px solid #2a2a2a;
  }
  .post-area-box {
    padding: 0 24px;
  }
  .post-textarea {
    width: 100%;
    min-height: 250px;
    padding: 10px;
    border: 0;
  }
  .preview-img-box {
    display: flex;
    width: 20%;
    align-items: center;
  }
  .preview-img {
    width: 100%;
  }
  .modal-footer {
    padding: 12px 24px;
    border-radius: 0 0 12px 12px;
    text-align: end;
  }
  .cancel-btn {
    background: #c21842;
    padding: 6px 16px;
    margin-right: 12px;
    cursor: pointer;
  }
  .posting-btn {
    background: #00c471;
    padding: 6px 16px;
    cursor: pointer;
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
