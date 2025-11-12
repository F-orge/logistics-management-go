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

const ReturnItemControls = () => {
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const [conditionFilter, setConditionFilter] = React.useState("");

  const handleFilterChange = () => {
    const filters = [];
    if (conditionFilter) filters.push(`condition = '${conditionFilter}'`);

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
  }, [conditionFilter]);

  return (
    <section className="col-span-full flex justify-between gap-4">
      <div className="flex gap-2">
      <Select value={conditionFilter} onValueChange={setConditionFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All condition" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="sellable">sellable</SelectItem>
          <SelectItem value="damaged">damaged</SelectItem>
          <SelectItem value="defective">defective</SelectItem>
          <SelectItem value="expired">expired</SelectItem>
          <SelectItem value="unsellable">unsellable</SelectItem>
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

export default ReturnItemControls;
