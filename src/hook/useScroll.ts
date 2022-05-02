import React, { useCallback, useEffect, useMemo, useState } from "react";

export default function useScroll() {
  const [scrollY, setScrollY] = useState<number>(window.scrollY);
//   const [active, setActive] = useState<boolean>(false);
  const [isTopDirection, setIsTopDirection] = useState<boolean>(false);

  const handleScroll = () => {
    if (scrollY < window.scrollY) {
      setIsTopDirection(false);
    }
    if (scrollY > window.screenY) {
      setIsTopDirection(true);
    }

    setScrollY(window.scrollY);
    // scrollY >= 64 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return [scrollY, isTopDirection] as [number , boolean] ;
}
