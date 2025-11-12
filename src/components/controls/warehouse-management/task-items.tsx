import { useNavigate } from "@tanstack/react-router";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TaskItemControls = () => {
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const [statusFilter, setStatusFilter] = React.useState("");

  const handleFilterChange = () => {
    const filters = [];
    if (statusFilter) filters.push(`status = '${statusFilter}'`);

    const filterQuery = filters.length > 0 ? filters.join(" && ") : "";

    if (!filterQuery) {
      navigate({
        search: (prev) => {
          const { filter, ...rest } = prev;
          return rest;
        },
      });
      return;
    }

    navigate({
      search: (prev) => ({
        ...prev,
        filter: filterQuery,
      }),
    });
  };

  React.useEffect(() => {
    handleFilterChange();
  }, [statusFilter]);

  return (
    <section className="col-span-full flex justify-between gap-4">
      <div className="flex gap-2">
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="pending">pending</SelectItem>
          <SelectItem value="in-progress">in-progress</SelectItem>
          <SelectItem value="completed">completed</SelectItem>
          <SelectItem value="short-picked">short-picked</SelectItem>
          <SelectItem value="damaged">damaged</SelectItem>
          <SelectItem value="not-found">not-found</SelectItem>
        </SelectContent>
      </Select>
      </div>
      <Button
        onClick={() =>
          navigate({ search: (prev) => ({ ...prev, action: "create" }) })
        }
      >
        Create
      </Button>
    </section>
  );
};

export default TaskItemControls;
