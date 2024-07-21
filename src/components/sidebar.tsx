import { cn } from "@/lib/utils";
import Link from "next/link";
import { SidebarItem } from "./sidebarItem";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";

const sidebarLinks = [
  {
    href: "/learn",
    label: "Learn",
    iconSrc: "/learn.svg",
  },
  {
    href: "/flashcards",
    label: "Flashcards",
    iconSrc: "/flashcards.png",
  },
  {
    href: "/leaderboard",
    label: "Leaderboard",
    iconSrc: "/leaderboard.svg",
  },
  {
    href: "/quests",
    label: "Quests",
    iconSrc: "/quests.svg",
  },
  {
    href: "/shop",
    label: "Shop",
    iconSrc: "/shop.svg",
  },
];

type Props = {
  className?: string;
};

export const Sidebar = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "h-full lg:w-[256px] lg:fixed flex top-0 px-4 border-r-2 flex-col",
        className
      )}
    >
      <Link href="/learn">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <h1 className="text-2xl font-extrabold text-primary tracking-wide">
            Vocab Voyage
          </h1>
        </div>
      </Link>
      <div className="flex flex-col gap-y-2 flex-1">
        {sidebarLinks.map((link) => (
          <SidebarItem key={link.href} {...link} />
        ))}
      </div>
      <div className="p-4">
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton afterSignOutUrl="/" />
        </ClerkLoaded>
      </div>
    </div>
  );
};
