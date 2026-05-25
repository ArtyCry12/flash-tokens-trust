import type { ComponentProps } from "react";
import type { VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

type CtaLinkProps = ComponentProps<"a"> &
  VariantProps<typeof buttonVariants>;

export function CtaLink({
  className,
  variant = "default",
  size = "default",
  ...props
}: CtaLinkProps) {
  return (
    <a
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
