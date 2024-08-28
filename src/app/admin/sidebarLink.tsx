"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export type SidebarLinkProps = {
  label: string;
  href: string;
};

const SidebarLink = ({ href, label }: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={cn("px-4 text-white", isActive && "text-secondary")}
    >
      {label}
    </Link>
  );
};

export default SidebarLink;
