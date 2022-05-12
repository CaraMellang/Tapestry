import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Post } from "../../../modules/redux/Group";
import Loading from "../../Loading";
import PostCard from "./PostCard";

interface PostLayoutProps {
  option: "groupfeed" | "newfeed" | "popularfeed";
}

export default function PostLayout({ option }: PostLayoutProps) {
  const [target, setTarget] = useState<HTMLElement | null | undefined>(null);
  const [feeds,setFeeds] = useState<Post[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [pageEnd, setPageEnd] = useState<boolean>(false);
  const userGroups = useSelector(
    (state: any) => state.userSliceReducer.user.group
  ); //groupfeed인 경우

  const onIntersect = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      if (entries[0].intersectionRatio <= 0)
        return console.log("인터섹션라티오", entries[0].intersectionRatio);
      if (entries[0].isIntersecting && loading === false) {
        const data = {
          group_arr: userGroups, //배열 | string
          page: pageNumber,
        };
      }
    },
    []
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
  return (
    <PostLayoutWrap>
      <PostCard />
      {loading && pageEnd === false ? (
        <Loading />
      ) : (
        <div>더이상 게시글이 없습니다.</div>
      )}
      <div ref={setTarget}>인식범위 입니다.(옵저버)</div>
    </PostLayoutWrap>
  );
}

const PostLayoutWrap = styled.div``;
