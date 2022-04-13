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
  ownerId: string;
  childComment: ChildComment[];
}

export default function ChildComLayout({
  postId,
  isShowChild,
  parantId,
  parantOwnerName,
  childLength,
  ownerId,
  childComment,
}: ChildComLayoutProps) {
  const [ChildArr, setChildArr] = useState<ChildComment[]>(childComment);
  const [reload, setReload] = useState(false);
  const getChildCom = async () => {
    try {
      const {
        data: { data },
      } = await client.get(`/comment/child/read`, {
        params: { parant_comment_id: parantId },
      });
      setChildArr(data);
    } catch (err) {
      console.log(err);
    }
  };

  const onReloading = () => {
    getChildCom();
  };

  useEffect(() => {
    if (childComment.length !== 0) getChildCom();
  }, []);
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
