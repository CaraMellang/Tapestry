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


  const onIntersect = async (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      console.log(entries[0].intersectionRatio);
      console.log("isinter", entries[0].isIntersecting);
      console.log("loading", loading);
      if (entries[0].intersectionRatio <= 0)
        return console.log("인터섹션라티오", entries[0].intersectionRatio);
      if (entries[0].isIntersecting && loading === false) {
        // observer.unobserve(entries[0].target)
        try {
          setLoading(true);
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
        } catch (err) {
          console.log(err);
        }
        // observer.observe(entries[0].target)
        setLoading(false);
      }
    }

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
