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

const InventoryStockControls = () => {
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
          <SelectItem value="available">available</SelectItem>
          <SelectItem value="allocated">allocated</SelectItem>
          <SelectItem value="damaged">damaged</SelectItem>
          <SelectItem value="quarantine">quarantine</SelectItem>
          <SelectItem value="hold">hold</SelectItem>
          <SelectItem value="shipped">shipped</SelectItem>
          <SelectItem value="expired">expired</SelectItem>
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

export default InventoryStockControls;
