import React, { useCallback, useEffect, useRef, useState } from "react";
import client from "../lib/api/client";
import { Post } from "../modules/redux/Group";

interface useInfiniteScrollProps {
  path: string;
}

export default function useInfiniteScroll<T>({ path }: useInfiniteScrollProps) {
  //중단
  const [target, setTarget] = useState<HTMLElement | null | undefined>(null);
  const [items, setItems] = useState<T>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [pageEnd, setPageEnd] = useState<boolean>(false);

  const onIntersect = useCallback(
    async (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      if (entries[0].intersectionRatio <= 0) return;
      if (entries[0].isIntersecting && loading === false && pageEnd === false) {
        const sendData = {
          // search: userGroups, //배열 | string
          page: pageNumber,
        };
        console.log(pageEnd);
        try {
          setLoading(true);
          const { data } = await client.get(path, {
            params: sendData,
          });
          console.log(data);
          //   setItems((prev) => [...prev, ...data.data]);
          // feeds.push(...data.data);
          setPageNumber((prev) => prev + 1);
          setPageEnd(data.page_end);
          setLoading(false);
        } catch (err: any) {
          setLoading(false);
          console.dir(err);
          setPageEnd(err.response.data.page_end); //페이지 종료여부
        }
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
  }, [onIntersect, target]);
  return;
}
