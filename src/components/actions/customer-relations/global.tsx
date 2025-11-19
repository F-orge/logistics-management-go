import { Files } from "lucide-react";
import { GlobalAction } from "@/lib/utils";

export default [
  {
    label: "Sort",
    submenuImport: async () => {
      const { default: items } = await import("./sort");
      return items;
    },
  },
  {
    label: "Export",
    icon: <Files />,
    submenuImport: async () => {
      const { default: items } = await import("./export");
      return items;
    },
  },
] satisfies GlobalAction<"/dashboard/$schema/$collection">[];
