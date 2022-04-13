import React from "react";
import styled from "styled-components";
import { ChildComment } from "./CommentItemList";

interface ChildComItemProps {
  ChildArr: ChildComment[] | undefined;
  ownerId: string;
}

export default function ChildComItem({ ChildArr, ownerId }: ChildComItemProps) {
  //상위 컴포넌트로 자식 리스트에서 map으로 써야함
  return (
    <ChildComItemWrap>
      {ChildArr
        ? ChildArr.map((item) => {
            return (
              <div key={item._id} style={{ display: "flex", padding: "4px 0" }}>
                <img
                  width={40}
                  height={40}
                  style={{
                    marginLeft: "5px",
                    marginTop: "5px",
                    borderRadius: 245,
                  }}
                  src={item.owner_id.user_img}
                />
                <div style={{ width: "100%" }}>
                  <span>{item.owner_id.user_name}</span>
                  <span>
                    {ownerId === item.owner_id._id
                      ? "⭐이 사람은 작성자 입니다⭐"
                      : ""}
                  </span>
                  <div>{item.text}</div>
                </div>
              </div>
            );
          })
        : ""}
    </ChildComItemWrap>
  );
}

const ChildComItemWrap = styled.div``;
