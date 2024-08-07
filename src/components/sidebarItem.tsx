"use client";

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

export type SidebarItemProps = {
  label: string;
  iconSrc: string;
  href: string;
};
export const SidebarItem = ({ label, iconSrc, href }: SidebarItemProps) => {
  const pathname = usePathname();
  const active = `/${pathname.split("/")[1]}` === href;
  return (
    <Button
      variant={active ? "sidebarOutline" : "sidebar"}
      className="justify-start h-[52px]"
    >
      <Link href={href} className="flex items-center">
        <Image
          src={iconSrc}
          alt={label}
          className="mr-5"
          height={32}
          width={32}
        />
        {label}
      </Link>
    </Button>
  );
};
