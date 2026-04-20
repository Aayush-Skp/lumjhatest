import { cn } from "@/lib/cn";
import type { ElementType, ComponentPropsWithoutRef } from "react";

type ContainerProps<T extends ElementType> = {
  as?: T;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

export function Container<T extends ElementType = "div">({
  as,
  className,
  ...rest
}: ContainerProps<T>) {
  const Component = (as ?? "div") as ElementType;
  return (
    <Component
      {...rest}
      className={cn("mx-auto w-full max-w-7xl px-6 md:px-10", className)}
    />
  );
}
