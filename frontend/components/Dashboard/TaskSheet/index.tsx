import { ETaskPriority, ETaskStatus, ITask } from "@/types";
import TaskColumn from "./TaskColumn";

const _TASK_SHEET_COLUMNS = [
  {
    Header: "To do",
    accessor: ETaskStatus.Todo,
    width: "25%",
  },
  {
    Header: "In Progress",
    accessor: ETaskStatus.InProgress,
    width: "25%",
  },
  {
    Header: "Under review",
    accessor: ETaskStatus.UnderReview,
    width: "25%",
  },
  {
    Header: "Finished",
    accessor: ETaskStatus.Finished,
    width: "25%",
  },
];

const dummyTasks: ITask[] = [
  {
    id: "1",
    title: "Design Landing Page",
    description: "Create the initial design for the product landing page.",
    status: ETaskStatus.Todo,
    priority: ETaskPriority.Medium,
    deadline: new Date("2024-09-15"),
    assignee: "Alice Johnson",
  },
  {
    id: "2",
    title: "Setup CI/CD Pipeline",
    description: "Implement and configure CI/CD for the project.",
    status: ETaskStatus.InProgress,
    priority: ETaskPriority.Urgent,
    deadline: new Date("2024-08-20"),
    assignee: "Bob Smith",
  },
  {
    id: "3",
    title: "Write API Documentation",
    description: "Document all the API endpoints with examples.",
    status: ETaskStatus.UnderReview,
    priority: ETaskPriority.Low,
    deadline: new Date("2024-08-25"),
    assignee: "Carol Davis",
  },
  {
    id: "4",
    title: "Optimize Database Queries",
    description: "Improve the performance of existing database queries.",
    status: ETaskStatus.Finished,
    priority: ETaskPriority.Medium,
    deadline: new Date("2024-08-10"),
    assignee: "David Thompson",
  },
  {
    id: "5",
    title: "User Testing & Feedback",
    description: "Conduct user testing sessions and gather feedback.",
    status: ETaskStatus.Todo,
    priority: ETaskPriority.Urgent,
    deadline: new Date("2024-09-05"),
    assignee: "Emily Clark",
  },
  {
    id: "6",
    title: "Fix Login Page Bugs",
    description: "Resolve the bugs reported on the login page.",
    status: ETaskStatus.InProgress,
    priority: ETaskPriority.Urgent,
    deadline: new Date("2024-08-18"),
    assignee: "Franklin Lee",
  },
  {
    id: "7",
    title: "Implement Dark Mode",
    description: "Add a dark mode feature to the application.",
    status: ETaskStatus.UnderReview,
    priority: ETaskPriority.Medium,
    deadline: new Date("2024-08-28"),
    assignee: "Grace Nguyen",
  },
  {
    id: "8",
    title: "Database Backup Setup",
    description: "Setup regular automated backups for the database.",
    status: ETaskStatus.Finished,
    priority: ETaskPriority.Low,
    deadline: new Date("2024-08-12"),
    assignee: "Hannah Martinez",
  },
];
const TaskSheet = () => {
  return (
    <section className="bg-white bor-3 flex gap-[--Size-S] p-[var(--Size-S)] h-[calc(100vh-290px)]">
      {_TASK_SHEET_COLUMNS.map((_column, index) => (
        <TaskColumn
          key={index}
          columnIdentifier={_column.accessor}
          header={_column.Header}
          widthPercent={_column.width}
          tasks={dummyTasks}
        />
      ))}
    </section>
  );
};

export default TaskSheet;
