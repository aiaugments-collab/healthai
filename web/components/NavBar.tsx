import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Calendar,
  MessageCircle,
  User,
  Menu,
  LogIn,
  LogOut,
  FileText,
  Pill,
  X,
  Activity,
  Stethoscope,
  Crown,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { signOut } from "@/lib/auth";
import { ModeToggle } from "@/components/ModeToggle";
import NavItem from "@/components/navigation/NavItem";
import NavLogo from "@/components/navigation/NavLogo";
import SubscriptionStatus from "@/components/subscription/SubscriptionStatus";



type NavBarProps = {
  staticNav?: boolean;
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function NavBar({
  staticNav = false,
  isExpanded,
  setIsExpanded,
}: NavBarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const navRef = useRef<HTMLDivElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session?.user);
    });
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsLoggedIn(!!session?.user);
      },
    );
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (window.innerWidth >= 768) return;

      if (
        mobileOpen &&
        navRef.current &&
        mobileButtonRef.current &&
        !navRef.current.contains(event.target as Node) &&
        !mobileButtonRef.current.contains(event.target as Node)
      ) {
        setMobileOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [mobileOpen]);

  const expandedWidth = "w-72";
  const collapsedWidth = "w-20";
  const desktopWidth = isExpanded ? expandedWidth : collapsedWidth;
  const mobileTranslate = mobileOpen ? "translate-x-0" : "-translate-x-full";
  const containerClasses = staticNav
    ? `${desktopWidth} bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col justify-between transition-all duration-300 h-screen shadow-2xl border-r border-white/10`
    : `fixed top-0 left-0 h-screen ${desktopWidth} bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col justify-between transition-all duration-300 z-40 transform ${mobileTranslate} md:translate-x-0 shadow-2xl border-r border-white/10`;
  const navItemsContainerClasses = isExpanded
    ? "mt-6 px-4 space-y-2 flex flex-col"
    : "mt-6 px-2 space-y-2 flex flex-col";

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      {!staticNav && (
        <button
          ref={mobileButtonRef}
          className="fixed top-2 right-2 z-50 md:hidden p-2 bg-primary text-white rounded-full shadow hover:bg-white/10 hover:text-primary cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setMobileOpen((prev) => !prev);
          }}
        >
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      )}
      <nav ref={navRef} className={containerClasses}>
        <div className="flex flex-col h-full">
          <NavLogo isExpanded={isExpanded} />
          
          {/* Scrollable Navigation Content */}
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
            <div className={navItemsContainerClasses}>
              {/* Main Navigation */}
              <div className="space-y-1">
                <NavItem
                  href="/home"
                  icon={<Home className="w-5 h-5" />}
                  label="Dashboard"
                  isExpanded={isExpanded}
                />
                <NavItem
                  href="/calendar"
                  icon={<Calendar className="w-5 h-5" />}
                  label="Appointments"
                  isExpanded={isExpanded}
                />
                <NavItem
                  href="/chat"
                  icon={<MessageCircle className="w-5 h-5" />}
                  label="AI Assistant"
                  isExpanded={isExpanded}
                />
              </div>

              {/* Health Management */}
              {isExpanded && (
                <div className="pt-6">
                  <h3 className="px-4 text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">
                    Health Management
                  </h3>
                  <div className="space-y-1">
                    <NavItem
                      href="/reminder"
                      icon={<Pill className="w-5 h-5" />}
                      label="Medications"
                      isExpanded={isExpanded}
                    />
                    <NavItem
                      href="/uploads"
                      icon={<FileText className="w-5 h-5" />}
                      label="Medical Records"
                      isExpanded={isExpanded}
                    />
                  </div>
                </div>
              )}

              {/* Collapsed state health items */}
              {!isExpanded && (
                <div className="space-y-1">
                  <NavItem
                    href="/reminder"
                    icon={<Pill className="w-5 h-5" />}
                    label="Medications"
                    isExpanded={isExpanded}
                  />
                  <NavItem
                    href="/uploads"
                    icon={<FileText className="w-5 h-5" />}
                    label="Medical Records"
                    isExpanded={isExpanded}
                  />
                </div>
              )}

              {/* Account Section */}
              <div className={isExpanded ? "pt-6 mt-8" : "mt-8"}>
                {isExpanded && (
                  <h3 className="px-4 text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">
                    Account
                  </h3>
                )}
                <div className="space-y-1">
                  <NavItem
                    href="/profile"
                    icon={<User className="w-5 h-5" />}
                    label="Profile"
                    isExpanded={isExpanded}
                  />
                  {isLoggedIn ? (
                    <NavItem
                      href="#"
                      icon={<LogOut className="w-5 h-5" />}
                      label="Sign Out"
                      isExpanded={isExpanded}
                      onClick={handleLogout}
                      variant="danger"
                    />
                  ) : (
                    <NavItem
                      href="/auth/login"
                      icon={<LogIn className="w-5 h-5" />}
                      label="Sign In"
                      isExpanded={isExpanded}
                    />
                  )}
                </div>
              </div>

              {/* Bottom padding to ensure scrolling works */}
              <div className="pb-4"></div>
            </div>
          </div>

          {/* Fixed Bottom Section - Subscription & Theme */}
          <div className="border-t border-white/10 p-4 space-y-4 flex-shrink-0">
            <SubscriptionStatus isExpanded={isExpanded} currentPlan="free" />
            <ModeToggle isExpanded={isExpanded} />
          </div>
        </div>
        <div className="border-t border-white/10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded((prev) => !prev);
            }}
            className="w-full flex items-center justify-center p-4 hover:bg-white/10 transition-all duration-200 cursor-pointer group"
            aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
            aria-expanded={isExpanded}
          >
            <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors duration-200">
              {isExpanded ? (
                <ChevronLeft className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" aria-hidden="true" />
              ) : (
                <ChevronRight className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" aria-hidden="true" />
              )}
            </div>
          </button>
        </div>
      </nav>
    </>
  );
}
