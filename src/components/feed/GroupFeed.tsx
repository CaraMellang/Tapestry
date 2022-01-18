import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import Loading from "../Loading";

export default function GroupFeed() {
  const [posts, setPosts] = useState<object[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  let isLoading = false;
  // const [isInterSecting, setIsInterSecting] = useState<boolean>(false)
  // const [observerRef, inView] = useInView();
  const [page, setPage] = useState(1);
  const observerTarget = useRef(null);
  const [target, setTarget] = useState<HTMLElement | null | undefined>(null);

  // // 서버에서 아이템을 가지고 오는 함수
  // const getItems = useCallback(async () => {
  //   setLoading(true);

  //   const {
  //     data: { data },
  //   } = await axios.post(`http://localhost:5000/post/read`, {
  //     group_id: "61cf23fade9e5f953c747b90",
  //     page: page,
  //   });
  //   console.log(data);
  //   setPosts((prevState) => [...prevState, ...data]);
  //   setLoading(false);
  // }, [page]);

  // // `getItems` 가 바뀔 때 마다 함수 실행
  // useEffect(() => {
  //   getItems();
  // }, [getItems]);

  // useEffect(() => {
  //   // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
  //   if (inView && !loading) {
  //     setPage((prevState) => prevState + 1);
  //   }
  // }, [inView, loading]);

  const onIntersect = useCallback(
    async (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      // console.log("옵저버 실행?");
      // console.log(entries);
      // console.log(observer);
      console.log(entries[0].intersectionRatio);
      console.log("isinter", entries[0].isIntersecting);
      // console.log("page", page);
      console.log("loading", loading);
      if (entries[0].intersectionRatio <= 0)
        return console.log("인터섹션라티오", entries[0].intersectionRatio);
      if (entries[0].isIntersecting && loading === false) {
        // observer.unobserve(entries[0].target)
        try {
          // setLoading(true);
          isLoading  = true
          const {
            data: { data },
          } = await axios.post(`http://localhost:5000/post/read`, {
            group_id: "61cf23fade9e5f953c747b90",
            page: page,
          });
          setPosts((prevState) => [...prevState, ...data]);
          setPage((prevState) => prevState + 1);
          console.log(data);
          console.log(page);
          console.log(loading);
          console.log(loading);
        } catch (err) {
          console.log(err);
        }
        // observer.observe(entries[0].target)
        // setLoading(false);
        isLoading  = false
      }
    },
    [page]
  );

  useEffect(() => {
    if (target) {
      console.log(page);
      let intersectionObserver = new IntersectionObserver(onIntersect, {
        threshold: 0.4,
      });
      intersectionObserver.observe(target);
      return () => intersectionObserver && intersectionObserver.disconnect();
    }
  }, [target, page]);

  return (
    <div>
      <h1 className="dd">그룹피드{page}</h1>
      <div>
        {posts.map((item: any, index: number) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "350px",
              }}
              key={index}
            >
              <div>
                <div>{item.group_name}</div>
                <div>{item.text}</div>
                <div>{item.created_at}</div>
              </div>
              <div>
                {/* {item.comment.map((commentItme: any) => {
                  return (
                    <div style={{ backgroundColor: "beige" }}>
                      {commentItme.text}
                    </div>
                  );
                })} */}
              </div>
            </div>
          );
        })}
        {loading ? <Loading /> : ""}
        <div ref={setTarget}>{loading.toString()}</div>
      </div>
    </div>
  );
}
