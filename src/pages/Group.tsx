import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

export default function Group() {
  const { _id } = useParams();
  console.log(_id);
  return <GroupWrap>{_id}</GroupWrap>;
}

const GroupWrap = styled.div``;
