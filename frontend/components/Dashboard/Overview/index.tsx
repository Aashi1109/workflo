import { HelpCircle } from "lucide-react";
import Link from "next/link";
import { InfoList } from "./InfoCard";
import ActionBar from "./ActionBar";

const DashboardOverview = () => {
  return (
    <section className=" flex flex-col gap-[var(--Size-S)]">
      <div className="flex-between">
        <p className="heading-1">Good morning, Joe</p>
        <Link href={"/help"} className="flex-center gap-[var(--Size-XXSM)]">
          <p>Help & Feedback</p>
          <HelpCircle className="base-icon" />
        </Link>
      </div>
      <InfoList />
      <ActionBar />
    </section>
  );
};

export default DashboardOverview;
