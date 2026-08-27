import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. მყისიერი სქროლი
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant" // "smooth"-ის ნაცვლად გამოიყენეთ "instant"
    });

    // 2. მცირე დაყოვნება, თუ კონტენტი ნელა იტვირთება
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 10);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}

export default ScrollToTop;