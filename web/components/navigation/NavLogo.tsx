import React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";

interface NavLogoProps {
  isExpanded: boolean;
}

export default function NavLogo({ isExpanded }: NavLogoProps) {
  return (
    <Link href="/home" className="block">
      <div className="flex items-center justify-center p-6 border-b border-white/10">
        {isExpanded ? (
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-white/20 to-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm group-hover:scale-105 transition-transform duration-200">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white tracking-tight">
                Health AI
              </span>
              <span className="text-xs text-white/60 font-medium">
                Your Health Companion
              </span>
            </div>
          </div>
        ) : (
          <div className="w-12 h-12 bg-gradient-to-br from-white/20 to-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm hover:scale-105 transition-transform duration-200 cursor-pointer group">
            <Heart className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-200" />
          </div>
        )}
      </div>
    </Link>
  );
}
