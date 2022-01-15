import axios from "axios";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Loading from "../Loading";

export default function GroupFeed() {
  const [posts, setPosts] = useState<object[]>([]);
  const [loading, setLoading] = useState(true);
  const [obserberRef, inView] = useInView();
  const [page, setPage] = useState(1);

  // useEffect(() => {
  //   async function readPost() {
  //     try {
  //       const {
  //         data: { data },
  //       } = await axios.post(`http://localhost:5000/post/read`, {
  //         group_id: "61cf23fade9e5f953c747b90",
  //         page: 1,
  //       });
  //       console.log(data);
  //       setPosts(data);
  //       setLoading(false);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   readPost();
  //   console.log(loading, posts);
  // }, []);

  useEffect(() => {
    async function getReadPost() {
      try {
        setLoading(true);
        const {
          data: { data },
        } = await axios.post(`http://localhost:5000/post/read`, {
          group_id: "61cf23fade9e5f953c747b90",
          page: page,
        });
        console.log(data);
        console.log(page)
        setPosts((prevData) => [...prevData, data]);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    getReadPost();
  }, [page]);

  useEffect(() => {
    if (inView && !loading) {
      setPage((prevState) => prevState + 1);
    }
  }, [inView, loading]);

  // if (loading) {
  //   return <Loading />;
  // }
  return (
    <div>
      <h1>그룹피드</h1>
      <div>
        {!loading && posts.map((item: any) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "350px",
              }}
              key={item._id}
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
        {loading ? <Loading /> : <div ref={obserberRef}></div>}
      </div>
    </div>
  );
}
