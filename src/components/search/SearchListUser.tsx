import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import styled from "styled-components";
import client from "../../lib/api/client";
import httpPath from "../../hook/useDesktop";
import Loading from "../Loading";
import { User } from "../../modules/redux/User";

interface SearchListUserProps {
  searchType: string;
}

export default function SearchListUser() {
  const [target, setTarget] = useState<HTMLElement | null | undefined>(null);
  const [searchListArr, setSearchListArr] = useState<User[]>([]);
  let loading = false;
  let pageEnd = false;
  let pageNo = 0;
  const { search } = useParams();

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
          type: "user",
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
    [loading]
  );

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
      <div
        style={{ textAlign: "center", fontSize: "3.5rem", fontWeight: "bold" }}
      >
        {search}
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {searchListArr.map((item) => {
          return (
            <div className="item-box" key={item._id}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img width={40} height={40} src={item.user_img} />
                <div style={{ marginLeft: "0.5rem" }}>{item.user_name}</div>
              </div>
              <div>
                <button className="following">팔로잉</button>
              </div>
            </div>
          );
        })}
      </div>

      {loading && pageEnd === false ? <Loading /> : <div>검색결과 끝</div>}
      <div ref={setTarget}></div>
    </SearchListWrap>
  );
}

const SearchListWrap = styled.div`
  .item-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.75rem;
    background: var(--bg-element2);
    padding: 0.5rem 0.75rem;
    border-radius: 8px;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.2);
    transition: all 0.1s ease-in-out;
    cursor: pointer;
  }
  .item-box:hover {
    transform: scale(1.02);
  }
  img {
    border-radius: 20px;
  }
  .following {
    color: white;
    background: #ff5757;
    border-radius: 4px;
    cursor: pointer;
  }
`;
