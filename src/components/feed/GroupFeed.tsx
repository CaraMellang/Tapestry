import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import Loading from "../Loading";

export default function GroupFeed() {
  const [posts, setPosts] = useState<object[]>([
    { group_name: "ㅗ" },
    { group_name: "ㅗ" },
    { group_name: "ㅗ" },
    { group_name: "ㅗ" },
    { group_name: "ㅗ" },
    { group_name: "ㅗ" },
  ]);
  let items = [];
  const [loading, setLoading] = useState(false);
  // const [observerRef, inView] = useInView();
  const [page, setPage] = useState(1);
  const observerTarget = useRef(null);
  const [target, setTarget] = useState();

  

  const onIntersect = useCallback(async (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => {
    console.log("옵저버 실행?");
    console.log(entries);
    console.log(observer);
    if (entries[0].intersectionRatio <= 0) return;
    if (entries[0].isIntersecting && loading === false) {
      // observer.unobserve(entries[0].target)
      setLoading(true);
      try {
        const {
          data: { data },
        } = await axios.post(`http://localhost:5000/post/read`, {
          group_id: "61cf23fade9e5f953c747b90",
          page: page,
        });
        setPosts((prevState) => [...prevState, ...data]);
        setPage((prevState) => prevState + 1);
        // observer.observe(entries[0].target)
        console.log(data);
        console.log(page);
        console.log(loading)
        setLoading(false);
        console.log(loading)
      } catch (err) {
        // observer.observe(entries[0].target)
        setLoading(false);
        console.log(err);
      }
    }
  },[page])

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(onIntersect, {
      threshold: 0.4,
    });
    if (observerTarget.current) {
      intersectionObserver.observe(observerTarget.current);
    }
  }, []);

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
        <div ref={observerTarget}></div>
      </div>
    </div>
  );
}
