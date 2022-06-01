import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import client from "../../../lib/api/client";
import { Post } from "../../../modules/redux/Group";
import Loading from "../../Loading";
import PostCard from "./PostCard";

interface PostLayoutProps {
  option?: "followingfeed" | "newfeed" | "popularfeed";
}

export default function PostLayout({ option }: PostLayoutProps) {
  const [target, setTarget] = useState<HTMLElement | null | undefined>(null);
  const [feeds, setFeeds] = useState<Post[]>([]);
  // let feeds: Post[] = [];
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [pageEnd, setPageEnd] = useState<boolean>(false);
  const [morePosts, setMorePosts] = useState<boolean>(false);
  const userGroups = useSelector(
    (state: any) => state.userSliceReducer.user.group
  ); //groupfeed인 경우

  const onIntersect = useCallback(
    async (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      if (morePosts) return console.log("아잉", morePosts, pageNumber);
      if (entries[0].intersectionRatio <= 0) return;
      if (entries[0].isIntersecting && loading === false && pageEnd === false) {
        const sendData = {
          // search: userGroups, //배열 | string
          page: pageNumber,
        };
        try {
          setLoading(true);
          const { data } = await client.get(`/post/${option}`, {
            params: sendData,
          });
          setFeeds((prev) => [...prev, ...data.data]);
          // feeds.push(...data.data);
          setPageNumber((prev) => prev + 1);
          setPageEnd(data.page_end);
          console.log(data.page_end);

          setLoading(false);
        } catch (err: any) {
          setLoading(false);
          console.dir(err);
          setPageEnd(err.response.data.page_end); //페이지 종료여부
        }
      }
    },
    [feeds, loading, pageNumber, userGroups, pageEnd, morePosts]
  );

  useEffect(() => {
    if (pageNumber % 2 === 0 && pageEnd === false) setMorePosts(true);
  }, [pageNumber, pageEnd]);
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
      {feeds.map((item) => (
        <PostCard key={item._id} postItem={item} />
      ))}
      {morePosts && (
        <div
          style={{
            textAlign: "center",
            color: "var(--primary1)",
            cursor: "pointer",
          }}
          onClick={() => setMorePosts(false)}
        >
          더보기
        </div>
      )}
      {loading && pageEnd === false ? <Loading /> : <div></div>}
      <div ref={setTarget} style={{ height: "1rem" }}></div>
    </PostLayoutWrap>
  );
}

const PostLayoutWrap = styled.div`
  width: 950px;
`;
