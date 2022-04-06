import React, { useEffect, useState } from "react";
import { Cropper } from "react-cropper";
import styled from "styled-components";
import "cropperjs/dist/cropper.css";

export default function ProfileImageCrop() {
  const [uploadImg, setUploadImg] = useState<[Blob] | [] | null>(null);
  const [fileImage, setFileImage] = useState<string | undefined>(undefined);
  const [cropData, setCropData] = useState<Cropper>();
  const [cropped, setCropped] = useState<string>();

  const onChangeImage = (e: any) => {
    console.log(e.target.files[0]);
    if (!e.target.files) {
      return;
    }
    setFileImage(URL.createObjectURL(e.target.files[0]));
  };

  const onClickGetCropped = () => {
    console.log(cropped, cropData);
    if (typeof cropData !== "undefined") {
      setCropped(cropData?.getCroppedCanvas().toDataURL());
      console.log("크롭스", cropData?.getData());
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
        <input type="file" accept="image/*" onChange={onChangeImage} />
      </div>
      <Cropper
        style={{ width: "400px", height: "400px" }}
        dragMode="none"
        background={false}
        viewMode={1}
        preview=".preview"
        autoCropArea={0.25}
        cropBoxResizable={false}
        zoomable={false}
        scaleX={0.5}
        scaleY={0.5}
        src={fileImage}
        onInitialized={(instance: Cropper) => {
          setCropData(instance);
        }}
      />
      <div>
        <p>프리뷰</p>
        <div style={{ width: "100%" }} className="preview" />
      </div>
      <button onClick={onClickGetCropped}>크롭</button>
      <img src={cropped} />
      <img src={fileImage} />
    </ProfileImageWrap>
  );
}

const ProfileImageWrap = styled.div`
  .crop {
    background: white;
  }
`;
