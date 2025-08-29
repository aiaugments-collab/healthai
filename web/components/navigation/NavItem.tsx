import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isExpanded: boolean;
  onClick?: () => void;
  badge?: string | number;
  variant?: "default" | "danger";
}

export default function NavItem({ 
  href, 
  icon, 
  label, 
  isExpanded, 
  onClick,
  badge,
  variant = "default"
}: NavItemProps) {
  const router = useRouter();
  const active = router.asPath === href;
  
  const baseClasses = "group relative w-full flex items-center transition-all duration-200 cursor-pointer rounded-xl";
  
  const variantClasses = {
    default: active 
      ? "bg-white/15 text-white shadow-lg backdrop-blur-sm" 
      : "text-white/80 hover:text-white hover:bg-white/10",
    danger: "text-red-400 hover:text-red-300 hover:bg-red-500/10"
  };
  
  const sizeClasses = isExpanded
    ? "px-4 py-3 gap-3"
    : "p-3 justify-center";

  const content = (
    <div className={cn(baseClasses, variantClasses[variant], sizeClasses)} onClick={onClick}>
      {/* Icon container */}
      <div className={cn(
        "flex-shrink-0 flex items-center justify-center transition-transform duration-200",
        "group-hover:scale-110",
        isExpanded ? "w-5 h-5" : "w-6 h-6"
      )}>
        {icon}
      </div>
      
      {/* Label and badge */}
      {isExpanded && (
        <div className="flex items-center justify-between w-full min-w-0">
          <span className="font-medium text-sm truncate transition-all duration-200">
            {label}
          </span>
          {badge && (
            <span className="ml-2 px-2 py-0.5 text-xs font-semibold bg-white/20 text-white rounded-full flex-shrink-0">
              {badge}
            </span>
          )}
        </div>
      )}
      
      {/* Active indicator */}
      {active && (
        <div className={cn(
          "absolute right-0 w-1 bg-white rounded-l-full transition-all duration-200",
          isExpanded ? "h-8" : "h-6"
        )} />
      )}
      
      {/* Tooltip for collapsed state */}
      {!isExpanded && (
        <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-lg">
          {label}
          {badge && (
            <span className="ml-2 px-1.5 py-0.5 text-xs bg-white/20 rounded-full">
              {badge}
            </span>
          )}
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45" />
        </div>
      )}
    </div>
  );

  if (onClick) {
    return <button className="w-full">{content}</button>;
  }

  return (
    <Link href={href} className="w-full">
      {content}
    </Link>
  );
}
