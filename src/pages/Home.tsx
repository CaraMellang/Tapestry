import React from "react";
import GroupList from "../components/home/GroupList";
import GroupListHeader from "../components/home/GroupListHeader";

function Home() {
  return (
    <div>
      <h1>home</h1>
      <GroupListHeader />
      <GroupList />

    </div>
  );
}

export default Home;
