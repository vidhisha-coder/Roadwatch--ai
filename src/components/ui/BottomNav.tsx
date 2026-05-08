"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Home,
  AlertTriangle,
  User,
  PlusSquare,
} from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Home",
      icon: Home,
      href: "/",
    },
    {
      label: "Report",
      icon: PlusSquare,
      href: "/report",
    },
    {
      label: "Alerts",
      icon: AlertTriangle,
      href: "/alerts",
    },
    {
      label: "Profile",
      icon: User,
      href: "/profile",
    },
  ];

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-md">
      <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-3 shadow-2xl">

        <div className="flex items-center justify-between">

          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all duration-300 ${
                  active
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >

                <Icon size={20} />

                <span className="text-xs">
                  {item.label}
                </span>

              </Link>
            );
          })}

        </div>
      </div>
    </div>
  );
}