"use client";

import { NAVBAR_MENU } from "@/constants";
import { usePathname } from "next/navigation";
import NavListItem from "./NavListItem";

const NavList = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-[var(--Size-XXSM)] w-full">
      {NAVBAR_MENU.map((_nav) => (
        <NavListItem
          key={_nav.label}
          isSelected={_nav.path === pathname}
          icon={_nav.icon}
          label={_nav.label}
          path={_nav.path}
        />
      ))}
    </div>
  );
};

export default NavList;
