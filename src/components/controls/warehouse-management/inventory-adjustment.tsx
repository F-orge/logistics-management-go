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

const InventoryAdjustmentControls = () => {
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const [reasonFilter, setReasonFilter] = React.useState("");

  const handleFilterChange = () => {
    const filters = [];
    if (reasonFilter) filters.push(`reason = '${reasonFilter}'`);

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
  }, [reasonFilter]);

  return (
    <section className="col-span-full flex justify-between gap-4">
      <div className="flex gap-2">
      <Select value={reasonFilter} onValueChange={setReasonFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All reason" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="cycle-count">cycle-count</SelectItem>
          <SelectItem value="damaged-goods">damaged-goods</SelectItem>
          <SelectItem value="theft">theft</SelectItem>
          <SelectItem value="expired">expired</SelectItem>
          <SelectItem value="return-to-vendor">return-to-vendor</SelectItem>
          <SelectItem value="manual-correction">manual-correction</SelectItem>
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

export default InventoryAdjustmentControls;
