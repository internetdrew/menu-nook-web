import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createSlug } from "@/lib/createSlug";
import { motion, useReducedMotion } from "motion/react";
import { useState, type MouseEvent } from "react";

const dialogEaseOut = [0.215, 0.61, 0.355, 1] as const;
const menuToggleTransition = {
  duration: 0.18,
  ease: dialogEaseOut,
} as const;

type CategoryDropdownProps = {
  categories: Array<{
    id: number | string;
    name: string;
  }>;
};

const getScrollBehavior = (): ScrollBehavior =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "instant"
    : "smooth";

const CategoryMenuIcon = ({
  isOpen,
  reduceMotion,
}: {
  isOpen: boolean;
  reduceMotion: boolean | null;
}) => {
  const transition = reduceMotion ? { duration: 0.01 } : menuToggleTransition;

  return (
    <span
      aria-hidden="true"
      className="relative block size-5"
      data-state={isOpen ? "open" : "closed"}
    >
      <motion.span
        className="absolute top-1/2 left-1/2 h-[1.67px] w-[13.33px] rounded-full bg-current"
        initial={false}
        animate={{
          x: "-50%",
          y: isOpen ? "-50%" : "calc(-50% - 5px)",
          rotate: isOpen ? 45 : 0,
        }}
        transition={transition}
      />
      <motion.span
        className="absolute top-1/2 left-1/2 h-[1.67px] w-[13.33px] rounded-full bg-current"
        initial={false}
        animate={{
          x: "-50%",
          y: "-50%",
          opacity: isOpen ? 0 : 1,
          scaleX: isOpen ? 0.65 : 1,
        }}
        transition={transition}
      />
      <motion.span
        className="absolute top-1/2 left-1/2 h-[1.67px] w-[13.33px] rounded-full bg-current"
        initial={false}
        animate={{
          x: "-50%",
          y: isOpen ? "-50%" : "calc(-50% + 5px)",
          rotate: isOpen ? -45 : 0,
        }}
        transition={transition}
      />
    </span>
  );
};

export default function CategoryDropdown({
  categories,
}: CategoryDropdownProps) {
  const prefersReducedMotion = useReducedMotion();
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);

  const selectCategory = (
    event: MouseEvent<HTMLAnchorElement>,
    categoryName: string,
  ) => {
    event.preventDefault();

    const categorySlug = createSlug(categoryName);
    setCategoryMenuOpen(false);
    history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.search}#${categorySlug}`,
    );

    window.requestAnimationFrame(() => {
      document.getElementById(categorySlug)?.scrollIntoView({
        behavior: getScrollBehavior(),
        block: "start",
      });
    });
  };

  return (
    <DropdownMenu open={categoryMenuOpen} onOpenChange={setCategoryMenuOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="shrink-0 text-neutral-700"
          aria-label={
            categoryMenuOpen ? "Close category menu" : "Open category menu"
          }
        >
          <CategoryMenuIcon
            isOpen={categoryMenuOpen}
            reduceMotion={prefersReducedMotion}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        onCloseAutoFocus={(event) => event.preventDefault()}
      >
        <DropdownMenuGroup>
          {categories.map((category) => (
            <DropdownMenuItem key={category.id} className="rounded-md" asChild>
              <a
                href={`#${createSlug(category.name)}`}
                className="text-sm font-[460]"
                onClick={(event) => selectCategory(event, category.name)}
              >
                {category.name}
              </a>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
