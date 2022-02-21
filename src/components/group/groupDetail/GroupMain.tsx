import React from "react";
import styled from "styled-components";
import GroupBody from "../GroupBody";

export default function GroupMain({ group_id }: { group_id: string | null }) {
  return (
    <GroupMainWrap>
      <GroupBody group_id={group_id} />
    </GroupMainWrap>
  );
}

const GroupMainWrap = styled.main`
  width: 950px;
  background-color: white;
`;
