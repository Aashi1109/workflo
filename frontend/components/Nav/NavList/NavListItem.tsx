import { cn } from "@/lib/utils";
import Link from "next/link";

const NavListItem = ({
  isSelected,
  icon,
  path,
  label,
}: {
  isSelected: boolean;
  icon: any;
  label: string;
  path: string;
}) => {
  const Icon = icon;
  return (
    <Link
      href={path}
      className={cn(
        "w-full h-10 font-size-lg text-[--gray-1] bor-4 flex-start gap-[--Size-SM] p-[--Size-XXSM]",
        { "border bg-[--gray-3] border-[--gray-7]": isSelected }
      )}
    >
      <Icon className="base-icon" />
      <p>{label}</p>
    </Link>
  );
};

export default NavListItem;
