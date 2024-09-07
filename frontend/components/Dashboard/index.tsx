import DashboardOverview from "./Overview";
import TaskSheet from "./TaskSheet";

const Dashboard = () => {
  return (
    <section className="flex flex-1 flex-col p-[var(--Size-S)] gap-[--Size-S]">
      <DashboardOverview />
      <TaskSheet />
    </section>
  );
};

export default Dashboard;
