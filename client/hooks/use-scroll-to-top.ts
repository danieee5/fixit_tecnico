import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    // Smooth scroll to top on route change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [location.pathname]);
}

export default useScrollToTop;
