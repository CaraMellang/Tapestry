import React from "react";
import styled from "styled-components";
import GroupSettingRows from "../../../common/group/GroupSettingRows";

export default function GroupSetting() {
  return (
    <GroupSettingWrap>
      <GroupSettingRows />
    </GroupSettingWrap>
  );
}

const GroupSettingWrap = styled.div``;
