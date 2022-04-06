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
      <div>
        <label
          className={`uploadButton ${
            loading ? "disableCursor" : "ableCursor"
          } `}
          htmlFor="fileInput"
        >
          파일 업로드
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
      <img
        src={userImg}
        style={{ width: "200px", height: "200px", borderRadius: "200px" }}
      />
    </ProfileImageWrap>
  );
}

const ProfileImageWrap = styled.div`
  .crop {
    background: white;
  }
  .uploadButton {
    display: inline-block;
    background: #15b91d;
    width: 200px;
  }
  .ableCursor {
    cursor: pointer;
  }
  .disableCursor {
    cursor: not-allowed;
  }
`;
