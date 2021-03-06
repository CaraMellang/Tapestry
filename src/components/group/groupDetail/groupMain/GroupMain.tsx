import React from "react";
import styled from "styled-components";
import { Outlet, Route, Routes, useParams } from "react-router-dom";
import GroupBody from "./GroupBody";
import GroupMember from "./GroupMember";

export default function GroupMain({ group_id }: { group_id: string | null }) {
  return (
    <GroupMainWrap>
      {/* <GroupBody group_id={group_id} /> */}
      <Outlet />
    </GroupMainWrap>
  );
}

const GroupMainWrap = styled.main`
  width: 940px;
  padding: 0.5rem;
  border-radius: 0.5rem;
`;
