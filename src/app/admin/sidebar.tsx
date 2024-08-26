import Link from "next/link";
import React from "react";

const links = [
  {
    name: "Courses",
    href: "/admin/courses",
  },
  {
    name: "Units",
    href: "/admin/units",
  },
  {
    name: "Lessons",
    href: "/admin/lessons",
  },
  {
    name: "Challenges",
    href: "/admin/challenges",
  },
];

const AdminSidebar = () => {
  return (
    <div className="bg-primary h-full">
      <h1>Dashboard</h1>
      <div className="flex flex-col items-center gap-4 p-4">
        {links.map((link) => (
          <Link key={link.name} href={link.href} className="px-4 text-white">
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
