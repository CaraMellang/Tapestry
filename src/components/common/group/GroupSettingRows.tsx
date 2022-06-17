import React from "react";
import styled from "styled-components";
import GroupSettingFixGroupRow from "./GroupSettingFixGroupRow";
import GroupSettingLeaveRow from "./GroupSettingLeaveRow";

export default function GroupSettingRows() {
  return (
    <GroupSettingRowsWrap>
      <GroupSettingFixGroupRow />
      <GroupSettingLeaveRow />
    </GroupSettingRowsWrap>
  );
}

const GroupSettingRowsWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
