import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { ArrowDownToLineIcon } from "lucide-react";

interface IProps {
  classes?: ClassValue;
}
const DownloadApp = ({ classes }: IProps) => {
  return (
    <div
      className={cn(
        "h-[60px] p-[--Size-P-XXSM] bor-3 bg-[--gray-14] text-[--gray-15] flex-start cursor-pointer gap-1",
        classes
      )}
    >
      <ArrowDownToLineIcon className="h-10 w-10" />
      <div className="flex flex-col gap-1">
        <p>Download the app</p>
        <p className="text-xsm">Get the full experience</p>
      </div>
    </div>
  );
};

export default DownloadApp;
