import { GlobalAction } from "@/lib/utils";

export default [
  {
    label: "Export Table Data",
    onSelect: (navigate) => {
      navigate({
        search: (prev) => ({
          ...prev,
          action: "export",
        }),
      });
    },
  },
] satisfies GlobalAction<"/dashboard/$schema/$collection">[];
