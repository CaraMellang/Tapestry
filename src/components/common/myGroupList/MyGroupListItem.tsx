import React from "react";
import styled from "styled-components";
import { Group } from "../../../modules/redux/Groups";

interface MyGroupListItemProps {
  item: Group;
}

export default function MyGroupListItem({ item }: MyGroupListItemProps) {
  return (
    <MyGroupListItemWrap>
      <img width={40} height={40} src={item.group_img} />
      <div className="group-name">{item.group_name}</div>
    </MyGroupListItemWrap>
  );
}

const MyGroupListItemWrap = styled.div`
  display: flex;
  align-items: center;

  img {
    border-radius: 20px;
  }
  .group-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 0.25rem;
  }
`;
