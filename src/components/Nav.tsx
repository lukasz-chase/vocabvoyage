"use client";
import { Anvil, Home, LogOut, Medal, Settings, User } from "lucide-react";
import { usePathname } from "next/navigation";
import NavItem from "./NavItem";

const Nav = () => {
  const pathname = usePathname();
  const navTopLinks = [
    {
      label: "Home",
      href: "/home",
      icon: Home,
    },
    {
      label: "Practice",
      href: "/practice",
      icon: Anvil,
    },
    {
      label: "Leaderboard",
      href: "/leaderboard",
      icon: Medal,
    },
    {
      label: "Profile",
      href: "/profile",
      icon: User,
    },
  ];
  const navBottomLinks = [
    {
      label: "Settings",
      href: "/settings",
      icon: Settings,
    },
    {
      label: "Logout",
      href: "/logout",
      icon: LogOut,
    },
  ];
  return (
    <nav className="flex flex-col h-full fixed bg-primary p-4 lg:p-8 w-14 md:w-40 lg:w-60">
      <div className="flex-1 mt-4">
        <h2 className="text-white font-bold text-lg lg:text-2xl hidden md:flex">
          VocabVoyage
        </h2>
        <div className="p-2 flex flex-col justify-center items-center gap-4 lg:gap-8">
          {navTopLinks.map(({ label, href, icon }) => (
            <NavItem
              key={href}
              isActive={pathname === href}
              label={label}
              href={href}
              icon={icon}
            />
          ))}
        </div>
      </div>
      <div className="p-2 flex flex-col justify-center items-center gap-4 lg:gap-8">
        {navBottomLinks.map(({ label, href, icon }) => (
          <NavItem
            key={href}
            isActive={pathname === href}
            label={label}
            href={href}
            icon={icon}
          />
        ))}
      </div>
    </nav>
  );
};

export default Nav;
