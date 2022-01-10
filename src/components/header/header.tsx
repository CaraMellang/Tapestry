import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Header() {
  return (
    <>
      <Link to={`/`}>메인~</Link>
      <Link to={`/home`}>홈~</Link>
      <Outlet />
    </>
  );
}
