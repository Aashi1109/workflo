"use client";

import Button from "@/components/ui/button";
import { MCirclePlus } from "@/components/ui/icons";
import SearchInput from "@/components/ui/SearchInput";
import {
  CalendarDays,
  FilterIcon,
  Share2Icon,
  SparklesIcon,
} from "lucide-react";
import { ChangeEvent, useState } from "react";

const ActionBar = () => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const OVERVIEW_ACTION_BUTTONS = [
    { label: "Calender View", icon: CalendarDays },
    { label: "Automation", icon: SparklesIcon },
    { label: "Filter", icon: FilterIcon },
    { label: "Share", icon: Share2Icon },
  ];
  return (
    <div className="flex-between overflow-x-scroll">
      <SearchInput
        placeholder="Search"
        value={searchText}
        handleChange={handleSearch}
        label="search"
      />

      <div className="flex-center gap-2">
        {OVERVIEW_ACTION_BUTTONS.map((_action) => {
          const Icon = _action.icon;
          return (
            <Button
              key={_action.label}
              variant="tertiary"
              label={_action.label}
              icon={<Icon className="base-icon" />}
              classes={"gap-[var(--Size-SM)] text-nowrap"}
            />
          );
        })}

        <Button
          variant="primary"
          label="Create new"
          icon={<MCirclePlus />}
          classes={"p-2"}
        />
      </div>
    </div>
  );
};

export default ActionBar;
