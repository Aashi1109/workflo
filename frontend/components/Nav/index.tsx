import { BellDot, ChevronsRight, Loader } from "lucide-react";
import DownloadApp from "../DownloadApp";
import AvatarPlaceholder from "../ui/AvatarPlaceholder";
import Button, { LabelButton } from "../ui/button";
import { MCirclePlus } from "../ui/icons";
import { NavList } from "./NavList";

const Navbar = () => {
  return (
    <section className="flex flex-col gap-4 w-[20%] min-w-[200px] px-4 pt-6 pb-8 bg-[--white] h-full">
      <div className="flex-col flex gap-2">
        <div className="flex-start gap-2">
          <AvatarPlaceholder />
          <p className="text-xl font-medium">Joe Gardener</p>
        </div>

        <div className="flex-between">
          <div className="flex gap-5 text-[--gray-6]">
            <BellDot className="base-icon" />
            <div className="relative">
              <Loader className="base-icon" />
              <div className="dot" />
            </div>
            <ChevronsRight className="base-icon" />
          </div>
          <LabelButton variant="tertiary" label="Logout" />
        </div>
      </div>

      {/* nav */}
      <NavList />

      <Button
        variant="primary"
        label="Create new task"
        icon={<MCirclePlus />}
      />
      <DownloadApp classes={"mt-auto"} />
    </section>
  );
};

export default Navbar;
