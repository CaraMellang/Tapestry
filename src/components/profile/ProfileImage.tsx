import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import client from "../../lib/api/client";
import { TOKEN_REQUEST } from "../../modules/redux/User";

export default function ProfileImage() {
  const [uploadImg, setUploadImg] = useState<[Blob] | [] | null>(null);
  const [fileImage, setFileImage] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const formData = new FormData();
  const dispatch = useDispatch();
  const userImg = useSelector(
    (state: any) => state.userSliceReducer.user.user_img
  );

  const onChangeImage = async (e: any) => {
    console.log(e.target.files[0]);
    if (!e.target.files) {
      return;
    }
    if (e.target.files[0].size > 1024 * 1024 * 2) {
      window.alert("2MB이하만 가능합니다.");
      return;
    }
    setFileImage(URL.createObjectURL(e.target.files[0]));
    formData.append("profile_img", e.target.files[0]);
    try {
      setLoading(true);
      await client.patch(`/profile/setimage`, formData);
      dispatch(TOKEN_REQUEST("."));
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    return () => {
      if (fileImage) URL.revokeObjectURL(fileImage);
    };
  }, []);
  return (
    <ProfileImageWrap>
      <img
        src={userImg}
        style={{ width: "128px", height: "128px", borderRadius: "200px" }}
      />
      <div>
        <label
          className={`uploadButton ${
            loading ? "disableCursor" : "ableCursor"
          } `}
          htmlFor="fileInput"
        >
          이미지 업로드
        </label>
        <input
          id="fileInput"
          style={{ display: "none" }}
          type="file"
          accept="image/*"
          onChange={onChangeImage}
          disabled={loading}
        />
      </div>
    </ProfileImageWrap>
  );
}

const ProfileImageWrap = styled.div`
  padding-right: 1.5rem;
  .crop {
    background: white;
  }
  img {
    margin-bottom: 1rem;
  }
  .uploadButton {
    display: inline-block;
    font-weight: bold;
    font-size: 1rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    padding: 0 1.25rem;
  }
  .ableCursor {
    cursor: pointer;
    background: var(--primary1);
  }
  .ableCursor:hover {
    background: var(--primary2);
  }
  .disableCursor {
    cursor: not-allowed;
    background: gray;
  }
`;
