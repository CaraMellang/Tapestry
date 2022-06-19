import {
  Box,
  ListItem,
  ListItemText,
  Modal,
  TextareaAutosize,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import useInput from "../../../hook/useInput";
import client from "../../../lib/api/client";
import { GROUP_RERENDER } from "../../../modules/redux/Group";
import Button from "../Button";

export default function GroupSettingFixGroupRow() {
  const [open, setOpen] = useState(false);
  const [description, onChangeDes, setDescription] = useInput("");
  const { _id } = useParams();
  const dispatch = useDispatch();

  const patchDesc = async () => {
    try {
      await client.patch(`/group/patchgroup`, { group_id: _id, description });
      dispatch(GROUP_RERENDER(""));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    (async function () {
      try {
        const {
          data: {
            Group: { group_description },
          },
        } = await client.post(`/group/groupdetail`, { group_id: _id });
        setDescription(group_description);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <GroupSettingFixGroupRowWrap>
      <ListItem>
        <ListItemText>그룹 수정</ListItemText>
        <ListItemText sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
          >
            그룹 수정
          </Button>
        </ListItemText>
      </ListItem>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{ ...boxStyle }}>
          <h1 style={{ textAlign: "center", fontWeight: "bold" }}>그룹 수정</h1>
          <TextareaAutosize
            value={description}
            onChange={onChangeDes}
            minRows={3}
            placeholder="그룹소개를 입력해주세요!"
            style={{
              color: "black",
              padding: "1rem",
              borderRadius: "0.5rem",
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "1rem",
            }}
          >
            <Button
              variant="contained"
              color="error"
              onClick={() => setOpen(false)}
              sx={{ lineHeight: 1.25 }}
            >
              취소
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setOpen(false);
                patchDesc();
                window.alert(
                  "수정 완료되었습니다."
                );
              }}
              sx={{ marginLeft: "0.5rem", lineHeight: 1.25 }}
            >
              수정
            </Button>
          </Box>
        </Box>
      </Modal>
    </GroupSettingFixGroupRowWrap>
  );
}

const boxStyle = {
  display: "flex",
  flexDirection: "column",
  background: "var(--bg-element2)",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  borderRadius: "0.5rem",
  padding: "1rem",
};

const GroupSettingFixGroupRowWrap = styled.div`
  background: var(--bg-element2);
  .modal_box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
  }
  textarea {
    color: black;
    resize: none;
    width: 100%;
    border: 0;
    border-radius: 8px;
    padding: 4px 8px;
  }
`;
