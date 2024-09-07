import {
  CalendarDays,
  ChartLine,
  FilterIcon,
  House,
  Settings,
  Share2Icon,
  SparklesIcon,
  SquareKanban,
  Users,
} from "lucide-react";

export const NAVBAR_MENU = [
  {
    label: "Home",
    icon: House,
    path: "/",
  },
  {
    label: "Boards",
    icon: SquareKanban,
    path: "/boards",
  },
  {
    label: "Settings",
    icon: Settings,
    path: "/settings",
  },
  {
    label: "Teams",
    icon: Users,
    path: "/teams",
  },
  {
    label: "Analytics",
    icon: ChartLine,
    path: "/analytics",
  },
];

export const OVERVIEW_INFOS = [
  {
    title: "Introducing Tags",
    description:
      "Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient.",
    src: "/assets/img/girl-with-board.png",
  },
  {
    title: "Share Notes Instantly",
    description:
      "Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options.",
    src: "/assets/img/link-sharing.png",
  },
  {
    title: "Access Anywhere",
    description:
      "Sync your notes across all devices. Stay productive whether you're on your phone, tablet, or computer.",
    src: "/assets/img/women-moving-mobile.png",
  },
];
