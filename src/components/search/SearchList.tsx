import axios from "axios";
import React, { useEffect } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import styled from "styled-components";
import httpPath from "../../lib/mode";

export default function SearchList() {
  const { search } = useParams();
  console.log(search);
  async function read() {
    const data = {
      search: "주르",
      page: 1,
      type: "group",
    };
    const dd = await axios.post(`${httpPath}/search/`, data);
    console.log(dd);
  }
  useEffect(() => {
    read();
  }, []);
  return (
    <SearchListWrap>
      <h1>search list</h1>
      <h1>검색결과: {search}</h1>
    </SearchListWrap>
  );
}

const SearchListWrap = styled.div``;
