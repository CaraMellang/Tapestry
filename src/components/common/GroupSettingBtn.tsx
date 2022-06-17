import React, { ReactNode } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import styled from "styled-components";

interface GroupSettingBtnProps
  extends Omit<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    "ref"
  > {
  children?: ReactNode;
}

export default function GroupSettingBtn({
  children,
  ...rest
}: GroupSettingBtnProps) {
  return (
    <GroupSettingBtnWrap {...rest}>
      <div>{children}&nbsp;</div>
      <SettingsIcon />
    </GroupSettingBtnWrap>
  );
}

const GroupSettingBtnWrap = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
