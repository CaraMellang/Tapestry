import React, { useState } from "react";
import Loading from "../Loading";

export default function GroupFeed() {
  const [posts, setPosts] = useState<Object[]>([{}]);
  const [loading, setLoading] = useState(true);
  if (loading) {
    return <Loading />;
  }
  return <div>그룹피드</div>;
}
