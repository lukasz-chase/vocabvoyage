import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import SidebarLink from "./sidebarLink";

const links = [
  {
    label: "Courses",
    href: "/admin/courses",
  },
  {
    label: "Units",
    href: "/admin/units",
  },
  {
    label: "Lessons",
    href: "/admin/lessons",
  },
  {
    label: "Challenges",
    href: "/admin/challenges",
  },
  {
    label: "Challenge Options",
    href: "/admin/challengeOptions",
  },
];

const AdminSidebar = () => {
  return (
    <div className="bg-primary h-full text-center p-4">
      <div className="flex flex-col items-center gap-4 ">
        {links.map((link) => (
          <SidebarLink key={link.label} {...link} />
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
