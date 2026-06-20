"use client";

import { forwardRef, type ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

type ButtonProps = HTMLMotionProps<"button"> & {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconRight?: ReactNode;
  children?: ReactNode;
  /** When provided, the button renders as an anchor link. */
  href?: string;
  target?: string;
  rel?: string;
};

const V: Record<Variant, string> = {
  primary:
    "bg-gradient-to-b from-brand-300 to-brand-500 text-bg-0 shadow-[0_0_0_1px_rgb(var(--brand-300)/0.4),0_10px_40px_-8px_rgb(var(--brand-400)/0.55)] hover:shadow-[0_0_0_1px_rgb(var(--brand-300)/0.55),0_14px_44px_-6px_rgb(var(--brand-300)/0.7)]",
  ghost: "bg-transparent text-fg-high hover:bg-bg-3/60",
  outline:
    "border border-stroke/25 bg-bg-2/30 text-fg-high hover:border-brand-300/50 hover:bg-bg-2/60",
};

const S: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "md",
    icon,
    iconRight,
    className,
    children,
    href,
    target,
    rel,
    ...rest
  },
  ref,
) {
  const classes = cn(
    "group relative inline-flex items-center justify-center gap-2 rounded-xl font-medium tracking-tight outline-none transition-all",
    "focus-visible:ring-2 focus-visible:ring-brand-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-0",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    V[variant],
    S[size],
    className,
  );

  const inner = (
    <>
      {icon ? (
        <span className="-ml-0.5 [&_svg]:h-4 [&_svg]:w-4">{icon}</span>
      ) : null}
      {children}
      {iconRight ? (
        <span className="-mr-0.5 [&_svg]:h-4 [&_svg]:w-4">{iconRight}</span>
      ) : null}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        whileHover={{ y: -1 }}
        whileTap={{ y: 0, scale: 0.99 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={classes}
        {...(rest as unknown as HTMLMotionProps<"a">)}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref}
      whileHover={{ y: -1 }}
      whileTap={{ y: 0, scale: 0.99 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={classes}
      {...rest}
    >
      {inner}
    </motion.button>
  );
});
