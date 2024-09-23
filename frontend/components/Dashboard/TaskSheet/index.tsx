"use client";

import { ETaskPriority, ETaskStatus, ITask } from "@/types";
import TaskColumn from "./TaskColumn";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useState } from "react";

const _TASK_SHEET_COLUMNS = [
  {
    Header: "To do",
    identifier: ETaskStatus.Todo,
    width: "25%",
  },
  {
    Header: "In Progress",
    identifier: ETaskStatus.InProgress,
    width: "25%",
  },
  {
    Header: "Under review",
    identifier: ETaskStatus.UnderReview,
    width: "25%",
  },
  {
    Header: "Finished",
    identifier: ETaskStatus.Finished,
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

const initializeTasks = (
  columns: Array<(typeof _TASK_SHEET_COLUMNS)[0]>,
  tasks: ITask[]
) => {
  const returnResult = new Map(
    columns.map((column) => [column.identifier, []])
  );

  for (const task of tasks) {
    if (returnResult.has(task.status)) {
      returnResult.get(task.status)!.push(task);
    }
  }

  return Object.fromEntries(returnResult);
};

const TaskSheet = () => {
  const [columnData, setColumnData] = useState(
    initializeTasks(_TASK_SHEET_COLUMNS, dummyTasks)
  );
  return (
    <DndProvider backend={HTML5Backend}>
      <section className="bg-white bor-3 flex gap-[--Size-S] p-[var(--Size-S)] h-[calc(100vh-290px)]">
        {Object.entries(columnData).map(([status, tasks]) => {
          const column = _TASK_SHEET_COLUMNS.find(
            (col) => col.identifier === status
          );
          return column ? (
            <TaskColumn
              key={status}
              columnIdentifier={status as ETaskStatus}
              header={column.Header}
              widthPercent={column.width}
              tasks={tasks}
              setColumnData={setColumnData}
            />
          ) : null;
        })}
      </section>
    </DndProvider>
  );
};

export default TaskSheet;
