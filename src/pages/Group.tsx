import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import GroupBody from "../components/group/groupDetail/groupMain/GroupBody";
import GroupHeader from "../components/group/GroupHeader";
import GroupDetail from "./GroupDetail";

export default function Group() {
  const { _id } = useParams();
  console.log(_id);
  return (
    <GroupWrap>
      <div>{_id}</div>
      <GroupHeader />
      {/* <GroupBody group_id={_id} /> */}
      <GroupDetail />
    </GroupWrap>
  );
}

const GroupWrap = styled.div``;
