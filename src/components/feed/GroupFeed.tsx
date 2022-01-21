import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import { GROUP_FEED_REQUEST } from "../../modules/redux/GroupFeed";
import Loading from "../Loading";

export default function GroupFeed() {
  const [posts, setPosts] = useState<object[]>([]);
  const [target, setTarget] = useState<HTMLElement | null | undefined>(null);
  const groupSelector = useSelector(
    (state: any) => state.groupFeedSliceReducer
  );
  const userSelector = useSelector((state: any) => state.userSliceReducer);
  const dispatch = useDispatch();
  console.log(groupSelector);

  const onIntersect = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      if (entries[0].intersectionRatio <= 0)
        return console.log("인터섹션라티오", entries[0].intersectionRatio);
      if (
        entries[0].isIntersecting &&
        groupSelector.groupFeedLoading === false
      ) {
        const data = {
          group_arr: userSelector.user.group,
          page: groupSelector.groupPageNumber,
        };
        dispatch(GROUP_FEED_REQUEST(data));
      }
    },
    [
      groupSelector.groupPageNumber,
      groupSelector.groupFeedLoading,
      userSelector.user.group,
    ]
  );

  useEffect(() => {
    if (target) {
      let intersectionObserver = new IntersectionObserver(onIntersect, {
        threshold: 0.4,
      });
      intersectionObserver.observe(target);
      return () => intersectionObserver && intersectionObserver.disconnect();
    }
  }, [target, onIntersect]);

  return (
    <div>
      <h1 className="dd">그룹피드</h1>
      <div>
        {groupSelector.groupFeeds.map((item: any, index: number) => {
          console.log(item);
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
                <div>{item.group_id.group_name}</div>
                <div>{item.text}</div>
                <div>
                  {item.owner_id !== null ? item.owner_id.user_name : "null"}
                </div>
                <div>{item.created_at}</div>
              </div>
              <div>
                {item.comment.map((commentItem: any) => {
                  return (
                    <div
                      key={commentItem._id}
                      style={{ backgroundColor: "beige" }}
                    >
                      {commentItem.text}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        {groupSelector.groupFeedLoading &&
        groupSelector.groupPageEnd === false ? (
          <Loading />
        ) : (
          <div>더이상 게시글이 없습니다.</div>
        )}
        <div ref={setTarget}></div>
      </div>
    </div>
  );
}
