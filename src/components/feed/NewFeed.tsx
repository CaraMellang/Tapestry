import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../Loading";

export default function NewFeed() {
  const [posts, setPosts] = useState<Object[]>([{}]);
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <h1>new피드</h1>
    </div>
  );
}
