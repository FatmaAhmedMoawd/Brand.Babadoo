import { cn } from "@/shared/lib/utils";
import React from "react";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  variant?: "primary" | "outline" | "ghost" | "secondary";
  size?: "sm" | "md" | "lg";
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  const variants = {
    primary: "bg-brand-brown text-white hover:bg-opacity-90",
    secondary: "bg-white text-brand-brown hover:bg-gray-50",
    outline:
      "border-2 border-white text-white hover:bg-white hover:text-brand-brown",
    ghost: "text-gray-600 hover:bg-gray-100",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base font-medium",
    lg: "px-8 py-4 text-lg font-semibold",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brown focus-visible:ring-offset-2",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}

export function Logo({
  className,
  invert = false,
  variant = "horizontal",
}: {
  className?: string;
  invert?: boolean;
  variant?: "horizontal" | "stacked";
}) {
  const horizontalLogoUrl = "https://i.postimg.cc/rpcWVV1G/Frame-1.png";
  const stackedLogoUrl = "https://i.postimg.cc/DzKD7XpM/Frame-1410126866.png";

  if (variant === "stacked") {
    return (
      <div
        className={cn(
          "flex flex-col items-center gap-4 text-center",
          className,
        )}
      >
        <img
          src={stackedLogoUrl}
          alt="Babbadoo Logo"
          className={cn(
            "w-48 h-48 sm:w-64 sm:h-64 object-contain",
            invert ? "brightness-50" : "",
          )}
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  return (
    <div className={cn("flex items-center", className)}>
      <img
        src={horizontalLogoUrl}
        alt="Babbadoo Logo"
        className={cn(
          "h-[40px] sm:h-[48px] w-auto object-contain shrink-0 origin-left rtl:origin-right",
          invert ? "brightness-90" : "",
        )}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
