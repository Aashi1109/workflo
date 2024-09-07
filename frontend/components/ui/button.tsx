import { cn } from "@/lib/utils";

interface IButtonProps {
  disabled?: boolean;
  label: string;
  variant: "primary" | "secondary" | "tertiary";
  icon?: any;
  classes?: string | object;
  type?: "button" | "submit";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({
  disabled,
  variant,
  icon,
  label,
  classes,
  type = "button",
  onClick,
}: IButtonProps) => {
  return (
    <button
      type={type}
      className={cn(
        "flex justify-center items-center gap-[var(--Size-XXSM)] darken-filter transition text-nowrap",
        {
          "primary-button": variant === "primary",
          "secondary-button": variant === "secondary",
          "tertiary-button": variant === "tertiary",
        },
        classes
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
      {icon}
    </button>
  );
};

export default Button;

export const LabelButton = (props: IButtonProps) => {
  return <Button {...props} />;
};

export const IconButton = (props: IButtonProps) => {
  return <Button {...props} />;
};
