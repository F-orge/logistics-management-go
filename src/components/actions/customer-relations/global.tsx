import { Files } from "lucide-react";
import { GlobalAction } from "@/lib/utils";
import exportSubmenu from "./export";
import sortSubmenu from "./sort";

export default [
  {
    label: "Sort",
    submenu: sortSubmenu,
  },
  {
    label: "Export",
    icon: <Files />,
    submenu: exportSubmenu,
  },
] satisfies GlobalAction<"/dashboard/$schema/$collection">[];
