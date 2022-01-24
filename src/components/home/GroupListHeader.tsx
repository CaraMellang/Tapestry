import React from "react";
import styled from "styled-components";

export default function GroupListHeader() {
  return (
    <GroupListHeaderWrap>
      <div>그룹목록헤더</div>
      <div>그룹 만들기</div>
    </GroupListHeaderWrap>
  );
}

const GroupListHeaderWrap = styled.div`
  display: flex;
`;
