import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import GroupBody from "../components/group/GroupBody";
import GroupHeader from "../components/group/GroupHeader";

export default function Group() {
  const { _id } = useParams();
  console.log(_id);
  return (
    <GroupWrap>
      <div>{_id}</div>
      <GroupHeader />
      <GroupBody group_id={_id} />
    </GroupWrap>
  );
}

const GroupWrap = styled.div``;