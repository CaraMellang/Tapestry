import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import { GROUP_FEED_REQUEST } from "../../modules/redux/GroupFeed";
import Loading from "../Loading";

export default function GroupFeed() {
  const [posts, setPosts] = useState<object[]>([]);
  // const [page, setPage] = useState(1);
  const observerTarget = useRef(null);
  const [target, setTarget] = useState<HTMLElement | null | undefined>(null);
  const selector = useSelector((state: any) => state.groupFeedSliceReducer);
  const dispatch = useDispatch();

  if (selector.groupFeedSucceed) {
    console.log(selector);
  }

  const onIntersect = async (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => {
    console.log(entries[0].intersectionRatio);
    console.log("isinter", entries[0].isIntersecting);
    if (entries[0].intersectionRatio <= 0)
      return console.log("인터섹션라티오", entries[0].intersectionRatio);
    if (entries[0].isIntersecting && selector.groupFeedLoading === false) {
      // observer.unobserve(entries[0].target)
      const data = {
        page: selector.groupPageNumber,
      };
      dispatch(GROUP_FEED_REQUEST(data));
      // try {
      //   const {
      //     data: { data },
      //   } = await axios.post(`http://localhost:5000/post/read`, {
      //     group_id: "61cf23fade9e5f953c747b90",
      //     page: page,
      //   });
      //   setPosts((prevState) => [...prevState, ...data]);
      //   setPage((prevState) => prevState + 1);
      //   console.log(data);
      //   console.log(page);
      // } catch (err) {
      //   console.log(err);
      // }
      // observer.observe(entries[0].target)
    }
  };

  useEffect(() => {
    if (target) {
      let intersectionObserver = new IntersectionObserver(onIntersect, {
        threshold: 0.4,
      });
      intersectionObserver.observe(target);
      return () => intersectionObserver && intersectionObserver.disconnect();
    }
  }, [target]);

  useEffect(() => {}, []);

  return (
    <div>
      <h1 className="dd">그룹피드{selector.groupFeedPage}</h1>
      <div>
        {selector.groupFeeds.map((item: any, index: number) => {
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
        {selector.groupFeedLoading ? <Loading /> : ""}
        <div ref={setTarget}>{selector.groupFeedLoading.toString()}</div>
      </div>
    </div>
  );
}
