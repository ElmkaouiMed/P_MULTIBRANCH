"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Link } from "@/routing";
import { Loader2 } from "lucide-react";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  icon?: ReactNode;
}

interface ButtonAsButton
  extends ButtonBaseProps,
    ButtonHTMLAttributes<HTMLButtonElement> {
  href?: never;
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<Variant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  outline: "btn-outline",
  ghost: "btn-ghost",
};

const sizeStyles: Record<Size, string> = {
  sm: "btn-sm",
  md: "btn-md",
  lg: "btn-lg",
};

const Button = forwardRef<HTMLButtonElement, ButtonAsButton>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      icon,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : icon}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  icon,
  className,
  children,
  target,
  rel,
  onClick,
}: ButtonAsLink) {
  const classes = cn(
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  const isExternal = href.startsWith("http") || href.startsWith("https");

  if (isExternal || target) {
    return (
      <a
        href={href}
        target={target || "_blank"}
        rel={rel || "noopener noreferrer"}
        className={classes}
        onClick={onClick}
      >
        {icon}
        {children}
      </a>
    );
  }

  return (
    <Link href={href as any} className={classes} onClick={onClick}>
      {icon}
      {children}
    </Link>
  );
}

export default Button;
