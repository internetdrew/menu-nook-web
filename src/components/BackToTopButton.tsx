import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

type BackToTopButtonProps = {
  navId: string;
};

const getScrollBehavior = (): ScrollBehavior =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "instant"
    : "smooth";

export default function BackToTopButton({ navId }: BackToTopButtonProps) {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    let animationFrame: number | null = null;

    const updateScrollToTopVisibility = () => {
      if (animationFrame !== null) return;

      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = null;
        const nav = document.getElementById(navId);
        const navBottom = nav
          ? nav.getBoundingClientRect().bottom + window.scrollY
          : 96;

        setShowScrollToTop(window.scrollY > navBottom);
      });
    };

    updateScrollToTopVisibility();
    window.addEventListener("scroll", updateScrollToTopVisibility, {
      passive: true,
    });
    window.addEventListener("resize", updateScrollToTopVisibility);

    return () => {
      window.removeEventListener("scroll", updateScrollToTopVisibility);
      window.removeEventListener("resize", updateScrollToTopVisibility);
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, [navId]);

  const scrollToTop = () => {
    if (window.location.hash) {
      history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}`,
      );
    }

    window.requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        behavior: getScrollBehavior(),
      });
    });
  };

  return (
    <Button
      onClick={scrollToTop}
      size="sm"
      className={`fixed right-4 bottom-4 inline-flex items-center rounded-full text-xs shadow-lg motion-safe:transition-transform motion-safe:duration-300 ${
        showScrollToTop ? "translate-x-0" : "translate-x-40"
      }`}
      aria-label="Scroll to top"
    >
      <ArrowUp className="size-4" /> Back to top
    </Button>
  );
}
