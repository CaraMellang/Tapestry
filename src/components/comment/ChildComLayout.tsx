import { editableInputTypes } from "@testing-library/user-event/dist/utils";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import client from "../../lib/api/client";
import ChildComItem from "./ChildComItem";
import { ChildComment } from "./CommentItemList";
import WriteComment from "./WriteComment";

interface ChildComLayoutProps {
  postId: string;
  isShowChild: boolean;
  parantId: string;
  parantOwnerName: string;
  childLength: number;
  ownerId:string;
}

export default function ChildComLayout({
  postId,
  isShowChild,
  parantId,
  parantOwnerName,
  childLength,ownerId
}: ChildComLayoutProps) {
  const [ChildArr, setChildArr] = useState<ChildComment[] | undefined>();
  const [reload, setReload] = useState(false);
  const getChildCom = async () => {
    try {
      const {
        data: { data },
      } = await client.get(`/comment/child/read`, {
        params: { parant_comment_id: parantId },
        validateStatus: function (status) {
          return status < 400;
        },
      });
      console.log("하이하이", data);
      setChildArr(data);
    } catch (err) {
      console.log(err);
    }
  };

  const onReloading = ()=>{
    setReload(prev=>!prev)
  }

  useEffect(() => {
    if (childLength !== 0) {
      console.log("너 리로드하는 친구구나!")
      getChildCom();
    }
  }, [reload]);

  return (
    <ChildComLayoutWrap>
      <ChildComItem ChildArr={ChildArr} ownerId={ownerId} />
      {isShowChild && (
        <WriteComment
          postId={postId}
          isChild={true}
          parantId={parantId}
          parantOwnerName={parantOwnerName}
          onReloading={onReloading}
        />
      )}
    </ChildComLayoutWrap>
  );
}

const ChildComLayoutWrap = styled.div``;
