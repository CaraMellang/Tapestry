import React, { useEffect, useState } from "react";

interface useDesktopProps {}

export default function useDesktop() {
  const [isDesktop, setDesktop] = useState(
    window.innerWidth >= 1024 ? true : false
  );
  const reloadWidthHandle = () => {
    if (window.innerWidth >= 1024) setDesktop(true);
    if (window.innerWidth < 1024) setDesktop(false);
  };
  useEffect(() => {
    window.addEventListener("resize", reloadWidthHandle);
    return () => {
      window.removeEventListener("resize", reloadWidthHandle);
    };
  }, []);
  return isDesktop;
}
