import React from "react";
import styled from "styled-components";
import { User } from "../../modules/redux/User";

interface MyFollowersItemProps {
  item: User;
}

export default function MyFollowersItem({ item }: MyFollowersItemProps) {
  return (
    <MyFollowersItemWrap>
      {item.email}, {item.user_name}
    </MyFollowersItemWrap>
  );
}

const MyFollowersItemWrap = styled.div``;
