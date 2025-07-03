"use client";

import { cn } from "@/utils/cn";

export default function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { children, className, ...restProps } = props;

  return (
    <button
      className={cn(
        "from-main-700 to-main-900 typo-semibold rounded-xl bg-gradient-to-r py-5 text-white disabled:from-gray-100 disabled:to-gray-100 disabled:text-gray-300",
        className
      )}
      {...restProps}
    >
      {children}
    </button>
  );
}
