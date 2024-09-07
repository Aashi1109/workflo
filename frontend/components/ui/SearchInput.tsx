import { Search } from "lucide-react";
import { ChangeEvent } from "react";

interface IProps {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  placeholder: string;
  label: string;
  disabled?: boolean;
  showIcon?: boolean;
}

const SearchInput = ({
  value,
  handleChange,
  showIcon = true,
  label,
  placeholder,
  disabled,
}: IProps) => {
  return (
    <div className="relative text-[--gray-1] group">
      <input
        type="text"
        className="bor-3 h-10 bg-[--white] gap-2 p-4 border border-[--gray-10] focus:outline-[--gray-7] w-[200px] pr-10 transition-[width] duration-300 ease-in-out focus:w-[230px]"
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={handleChange}
        name={label}
        id={label}
      />
      {showIcon && (
        <label htmlFor={label}>
          <Search className="base-icon absolute top-[50%] right-4 translate-y-[-50%] " />
        </label>
      )}
    </div>
  );
};

export default SearchInput;
