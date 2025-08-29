import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface AuthLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "muted";
  className?: string;
  external?: boolean;
}

export default function AuthLink({ 
  href, 
  children, 
  variant = "primary", 
  className,
  external = false 
}: AuthLinkProps) {
  const variants = {
    primary: "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium",
    secondary: "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 font-medium",
    muted: "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
  };

  const baseStyles = "transition-colors duration-200 hover:underline";

  const linkProps = external 
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { href };

  return (
    <Link
      {...linkProps}
      className={cn(baseStyles, variants[variant], className)}
    >
      {children}
    </Link>
  );
}
