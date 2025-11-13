import { useNavigate } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { GlobalAction } from "@/lib/utils";

export default [
  {
    label: "Sort",
    submenu: [
      {
        label: "Oldest to Newest",
        onSelect: (navigate) => {
          navigate({
            search: (prev) => ({
              ...prev,
              sort: "created",
            }),
          });
        },
        icon: (searchQuery) => searchQuery.sort === "created" && <Check />,
      },
      {
        label: "Newest to Oldest",
        onSelect: (navigate) => {
          navigate({
            search: (prev) => ({
              ...prev,
              sort: "-created",
            }),
          });
        },
        icon: (searchQuery) => searchQuery.sort === "-created" && <Check />,
      },
    ],
  },
] satisfies GlobalAction<"/dashboard/$schema/$collection">[];
