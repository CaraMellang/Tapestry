import React, { useState } from "react";
import Loading from "../Loading";

export default function Popular() {
  const [posts, setPosts] = useState<Object[]>([{}]);
  const [loading, setLoading] = useState(true);
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <h1>인기피드</h1>
    </div>
  );
}
