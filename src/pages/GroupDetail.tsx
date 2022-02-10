import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

export default function GroupDetail() {
  const param = useParams();
  console.log(param);
  useEffect(() => {}, []);

  return (
    <GroupDetailWrap>
      <h1>그룹 디테일 페이지</h1>
      <div>해당 그룹의 아이디 {param._id}</div>
    </GroupDetailWrap>
  );
}

const GroupDetailWrap = styled.div``;
