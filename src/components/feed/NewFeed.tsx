import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../Loading";

export default function NewFeed() {
  const [posts, setPosts] = useState<Object[]>([{}]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function readPost() {
      try {
        const {
          data: { data },
        } = await axios.post(`http://localhost:5000/post/read`, {
          group_id: "61cf23fade9e5f953c747b90",
          page: 1,
        });
        console.log(data);
        setPosts(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    readPost();
    console.log(loading, posts);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <h1>new피드</h1>
      <div>
        {posts.map((item: any) => {
          return (
            <div style={{ display: "flex" }} key={item._id}>
              <div>{item.group_name}</div>
              <div>{item.text}</div>
              <div>{item.created_at}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
