import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const selectVariants = cva(
  "relative inline-flex items-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type SelectHTMLProps = Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'>;

export interface SelectProps
  extends SelectHTMLProps,
    VariantProps<typeof selectVariants> {
  asChild?: boolean;
  size?: "default" | "sm" | "lg" | null;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, variant, size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "select";
    return (
      <Comp
        className={cn(selectVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Select.displayName = "Select";

export { Select, selectVariants };
