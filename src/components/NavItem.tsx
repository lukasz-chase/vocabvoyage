import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  isActive: boolean;
}

const NavItem = ({ href, icon: Icon, isActive, label }: NavItemProps) => {
  return (
    <div
      key={href}
      className={cn(
        "p-2 w-10 md:w-32 lg:w-48 rounded-full md:rounded-3xl",
        isActive && "bg-foreground text-white"
      )}
    >
      <a
        href={href}
        className="flex gap-4 items-center justify-center md:justify-start md:ml-2"
      >
        <Icon className="w-6 h-6 md:w-4" />
        <span className="hidden md:flex md:text-xs lg:text-xl">{label}</span>
      </a>
    </div>
  );
};

export default NavItem;
