import { cn } from "@/lib/utils";

const Chip = ({
  label,
  classes,
  variant,
}: {
  label: string;
  classes?: string;
  variant: "warning" | "success" | "danger";
}) => {
  return (
    <div
      className={cn(
        "text-sm text-[--white] bor-3 px-2 py-1.5",
        {
          "bg-[--success]": variant === "success",
          "bg-[--danger]": variant === "danger",
          "bg-[--orange]": variant === "warning",
        },
        classes
      )}
    >
      {label}
    </div>
  );
};

export default Chip;
