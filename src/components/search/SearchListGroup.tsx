import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import client from "../../lib/api/client";
import httpPath from "../../lib/mode";
import Loading from "../Loading";

interface SearchListGroupProps {
  searchType: string;
}

export default function SearchListGroup({ searchType }: SearchListGroupProps) {
  const [target, setTarget] = useState<HTMLElement | null | undefined>(null);
  const [searchListArr, setSearchListArr] = useState<any>([]);
  let loading = false;
  let pageEnd = false;
  let pageNo = 0;
  const { search } = useParams();
  const navigate = useNavigate();
  console.log(searchType);

  const onIntersect = useCallback(
    async (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      if (entries[0].intersectionRatio <= 0)
        return console.log("인터섹션라티오", entries[0].intersectionRatio);
      if (entries[0].isIntersecting && loading === false) {
        loading = true;
        pageNo += 1;
        const data = {
          search: search,
          page: pageNo,
          type: searchType,
        };
        try {
          const resData = await client.post(`/search/`, data);
          // const resData = await axios.post(`${httpPath}/search/`, data);
          const resDataArr = resData.data.data;
          if (resDataArr.length <= 0) {
            pageNo -= 1;
            pageEnd = true;
            console.log("실행함?");
            console.log(pageNo, pageEnd);
            return;
          }
          setSearchListArr((prev: any) => [...prev, ...resDataArr]);
          loading = false;
          console.log(resData);
        } catch (err) {
          console.log(err);
          window.alert("로딩실패");
          loading = false;
        }
      }
    },
    [loading, search]
  );

  const groupClick = (item: any) => {
    console.log("그룹클릭", item);
    navigate(`/groupdetail/${item._id}`);
  };

  useEffect(() => {
    setSearchListArr([]);
  }, [search]);

  useEffect(() => {
    if (target) {
      let intersectionObserver = new IntersectionObserver(onIntersect, {
        threshold: 0.4,
      });
      intersectionObserver.observe(target);
      return () => {
        intersectionObserver && intersectionObserver.disconnect();
      };
    }
  }, [target, onIntersect]);

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <SearchListWrap>
      <h1>search list</h1>
      <h1>검색결과: {search}</h1>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {searchListArr.map((item: any, index: number) => {
          return (
            <div
              key={index}
              style={{ height: "100px", cursor: "pointer" }}
              onClick={() => {
                groupClick(item);
              }}
            >
              {item.group_name}
            </div>
          );
        })}
      </div>

      {loading && pageEnd === false ? <Loading /> : <div>검색결과 끝</div>}
      <div ref={setTarget}></div>
    </SearchListWrap>
  );
}

const SearchListWrap = styled.div``;
