import { ListItem, ListItemText } from "@mui/material";
import React from "react";
import styled from "styled-components";
import Button from "../Button";

export default function GroupSettingLeaveRow() {
  return (
    <GroupSettingLeaveRowWrap>
      <ListItem>
        <ListItemText>그룹 삭제</ListItemText>
        <ListItemText sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" color="error">
            그룹 삭제
          </Button>
        </ListItemText>
      </ListItem>
    </GroupSettingLeaveRowWrap>
  );
}

const GroupSettingLeaveRowWrap = styled.div`
  background: var(--bg-element2);
`;
