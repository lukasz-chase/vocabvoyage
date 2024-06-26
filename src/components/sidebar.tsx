import { cn } from "@/lib/utils";
import Link from "next/link";
import { SidebarItem } from "./sidebarItem";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";

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
        <SidebarItem iconSrc="/learn.svg" href="/learn" label="Learn" />
        <SidebarItem
          iconSrc="/leaderboard.svg"
          href="/leaderboard"
          label="Leaderboard"
        />
        <SidebarItem iconSrc="/quests.svg" href="/quests" label="Quests" />
        <SidebarItem iconSrc="/shop.svg" href="/shop" label="Shop" />
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
