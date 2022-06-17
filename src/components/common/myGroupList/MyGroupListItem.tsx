import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Group } from "../../../modules/redux/Groups";
import UserAvatar from "../UserAvatar";

interface MyGroupListItemProps {
  item: Group;
}

export default function MyGroupListItem({ item }: MyGroupListItemProps) {
  return (
    <MyGroupListItemWrap>
      <Link to={`/group/${item._id}/post`}>
        <UserAvatar src={item.group_img} />
        <div className="group-name">{item.group_name}</div>
      </Link>
    </MyGroupListItemWrap>
  );
}

const MyGroupListItemWrap = styled.div`
  img {
    border-radius: 20px;
  }
  a {
    display: flex;
    align-items: center;
  }
  .group-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 0.25rem;
  }
`;
